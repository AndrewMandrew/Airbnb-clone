import React, { createContext, useContext } from "react"
import axios from "axios"
import { useAuth } from "./authContext"
import createAuthRefreshInterceptor from "axios-auth-refresh"

interface AxiosProps {
  authAxios?: any
  publicAxios?: any
}

const AxiosContext = createContext<AxiosProps>({})

export const useAxios = () => {
  return useContext(AxiosContext)
}

export const AxiosProvider = ({ children }: any) => {
  const { authState, setAuthState } = useAuth()

  const authAxios = axios.create({
    baseURL: "http://192.168.1.94:4000",
  })

  const publicAxios = axios.create({
    baseURL: "http://192.168.1.94:4000",
  })

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authState?.token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  const refreshAuthLogic = (failedRequest: any) => {
    const options = {
      method: "PATCH",
      headers: { Authorization: `Bearer ${authState?.refreshToken}` },
      url: "/auth/local/refresh",
    }
    console.log(options)

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization = "Bearer " + tokenRefreshResponse.data.accessToken

        setAuthState!({
          ...authState,
          token: tokenRefreshResponse.data.accessToken,
        })

        return Promise.resolve()
      })
      .catch((e) => {
        console.log("🚀 ~ file: axiosContext.tsx:69 ~ refreshAuthLogic ~ e:", e)

        setAuthState!({
          token: null,
          refreshToken: null,
          authenticated: null,
          loading: false,
        })
      })
  }

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {})

  const value = {
    authAxios,
    publicAxios,
  }

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
}
