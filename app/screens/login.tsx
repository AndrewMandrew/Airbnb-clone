import { View, Text, Button, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useAuth } from "../context/authContext"
import { TextInput } from "react-native-gesture-handler"
import { useRouter } from "expo-router"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { onLogin, onRegister } = useAuth()
  const router = useRouter()

  const login = async () => {
    const result = await onLogin!(email, password)
    if (result && result.error) {
      alert(result.msg)
    } else router.replace("/(tabs)")
  }

  const register = async () => {
    const result = await onRegister!(email, password)
    if (result && result.error) {
      alert(result.msg)
    } else {
      login()
    }
  }

  return (
    <View>
      <View className="items-center w-full">
        <View className="w-11/12 gap-5 mt-1">
          <TextInput
            className="h-11  rounded-lg p-2.5 bg-white"
            placeholder="email"
            placeholderTextColor={"gray"}
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="h-11  rounded-lg p-2.5 bg-white"
            placeholder="password"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
        <View className="w-11/12 border-b-stone-300 border-b-2 mt-5 " />
        <View className="w-11/12 gap-5 mt-1">
          <TouchableOpacity
            className="h-11 w-11/12 mt-1 bg-primary rounded-lg justify-center items-center"
            onPress={login}
          >
            <Text className="text-white text-center "> Sign in </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="h-11 w-11/12 mt-1 bg-primary rounded-lg justify-center items-center"
            onPress={register}
          >
            <Text className="text-white text-center "> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Page
