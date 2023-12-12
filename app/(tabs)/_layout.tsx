import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Tabs, useNavigation, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../context/authContext'

const Layout = () => {
	const router = useRouter();
  const {authState, onLogout } = useAuth();


  // You can keep the splash screen open, or render a loading screen like we do here.
  if (authState?.loading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!authState?.authenticated) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/screens/login" />;
  }
 

	

  return (
    <Tabs
		screenOptions={{
		tabBarActiveTintColor: Colors.primary,
		tabBarLabelStyle:{
			fontFamily: 'mon-sb'
		}
		
		}}  
    >
		<Tabs.Screen 
			name="index" 
			options={{
				tabBarLabel: 'Explore',
				tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />
			}}
		/>
		<Tabs.Screen 
			name="wishlists" 
			options={{
				tabBarLabel: 'Wishlists',
				tabBarIcon: ({ color, size }) => <Ionicons name='heart-outline' color={color} size={size} />
			}}
		/>
		<Tabs.Screen 
			name="trips" 
			options={{
				tabBarLabel: 'Trips',
				tabBarIcon: ({ color, size }) => <FontAwesome5 name='airbnb' color={color} size={size} />
			}}
		/>
		<Tabs.Screen 
			name="inbox" 
			options={{
				tabBarLabel: 'Inbox',
				tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='message-outline' color={color} size={size} />
			}}
		/>
		<Tabs.Screen 
			name="profile" 
			options={{
				tabBarLabel: 'Profile',
				tabBarIcon: ({ color, size }) => <Ionicons name='person-circle-outline' color={color} size={size} />
			}}
		/>
    </Tabs>
  )
}

export default Layout