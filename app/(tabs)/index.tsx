import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useAuth } from '../context/authContext';

const Page = () => {

  const {onLogout} = useAuth();
  return (
    <View>
      <Link href={"/screens/login"}> Login </Link>
      <Link href={"/(modals)/booking"}> Booking </Link>
      <Link href={"/listing/123"}> Listing details </Link>
      <Button onPress={onLogout} title='Logout'/>
    </View>
  )
}

export default Page