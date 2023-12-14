import { View, Text } from "react-native"
import React, { useEffect } from "react"

interface Props {
  listings: any[]
  category: string
}

const Listing = ({ listings, category }: Props) => {
  useEffect(() => {
    console.log("RELOAD LISTINGS")
  }, [category])
  return (
    <View>
      <Text>listing</Text>
    </View>
  )
}

export default Listing
