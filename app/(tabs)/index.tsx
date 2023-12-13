import { View, Text, Button } from "react-native"
import React, { useContext } from "react"
import { Link } from "expo-router"
import { useAuth } from "../context/authContext"
import { useAxios } from "../context/axiosContext"
import axios from "axios"

const Page = () => {
  const { authAxios } = useAxios()

  const getInfo = () => {
    authAxios
      .get("/account/info")
      .then((res: any) => {
        console.log("🚀 ~ file: index.tsx:13 ~ getInfo ~ res:", res)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const { onLogout } = useAuth()
  return (
    <View>
      <Link href={"/screens/login"}> Login </Link>
      <Link href={"/(modals)/booking"}> Booking </Link>
      <Link href={"/listing/123"}> Listing details </Link>
      <Button onPress={onLogout} title="Logout" />
      <Button onPress={getInfo} title="Get user info" />
    </View>
  )
}

export default Page
