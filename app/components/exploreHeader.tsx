import { View, Text, TouchableOpacity } from "react-native"
import React, { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
]

interface Props {
  onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const itemsRef = useRef<Array<TouchableOpacity | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<ScrollView>(null)

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index)

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    onCategoryChanged(categories[index].name)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white h-28">
        <View className="flex-row items-center px-5 pb-2 gap-5">
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity className="flex-row items-center pb-2 gap-2 border rounded-full border-stone-200 w-72 shadow-black shadow-lg">
              <Ionicons name="search" size={24} />
              <View>
                <Text>where to?</Text>
                <Text className="text-gray">Anywhere • Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="p-1 border-2 border-gray rounded-full">
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", gap: 30, paddingHorizontal: 16 }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectCategory(index)}
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={
                activeIndex === index
                  ? "flex-1 items-center justify-center pb-2  border-b-black border-b-2"
                  : "flex-1 items-center justify-center pb-2"
              }
            >
              <MaterialIcons name={item.icon as any} size={24} color={activeIndex === index ? "#000" : "#5E5D5E"} />
              <Text className={activeIndex === index ? "text-black-500" : "text-gray"}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ExploreHeader
