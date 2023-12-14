import { Ionicons } from "@expo/vector-icons"
import { isLoaded, useFonts } from "expo-font"
import { Redirect, SplashScreen, Stack, useRouter } from "expo-router"
import { useEffect, useReducer } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as SecureStore from "expo-secure-store"
import { useAuth } from "./context/authContext"
import { AuthProvider } from "./context/authContext"
import { AxiosProvider } from "./context/axiosContext"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
    SplashScreen.hideAsync()
  }, [error])

  useEffect(() => {
    if (loaded) {
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <AxiosProvider>
        <RootLayoutNav />
      </AxiosProvider>
    </AuthProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/login"
        options={{
          title: "Log in or sign up",
          animation: "none",
          headerTitleStyle: {},
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
