import { View, Text, Button } from "react-native"
import React, { useContext, useState } from "react"
import { Link, Stack } from "expo-router"
import { useAuth } from "../context/authContext"
import { useAxios } from "../context/axiosContext"
import ExploreHeader from "../components/exploreHeader"
import Listing from "../components/listing"

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

  const [category, setCategory] = useState("Tiny homes")

  const onDataChanged = (category: string) => {
    console.log("🚀 ~ file: index.tsx:26 ~ onDataChanged ~ category:", category)
    setCategory(category)
  }
  return (
    <View className="flex mt-20">
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listing listings={[]} category={category} />

      <Button onPress={onLogout} title="Logout" />
      <Button onPress={getInfo} title="Get user info" />
    </View>
  )
}

export default Page
