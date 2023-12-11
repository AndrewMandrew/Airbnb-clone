import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();
  const router = useRouter();

  const login = async () => {
    const result = await onLogin!(email, password);
    if(result && result.error) {
      alert(result.msg);
    } else ( router.replace('/(tabs)') )
  }

  const register = async () => {
    const result = await onRegister!(email, password);
    if(result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  }

  return (
    <View>
      <View className='items-center w-full'>
          <View className='w-3/5 gap-10'>
            <TextInput className='h-11 border-2 rounded-s p-2.5 bg-white' placeholder='email' placeholderTextColor={'gray'} onChangeText={(text: string) => setEmail(text)} value={email}/>
            <TextInput className='h-11 border-2 rounded-s p-2.5 bg-white' placeholder='password' placeholderTextColor={'gray'} secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password}/>
            <Button onPress={login} title='Sign in' />
            <Button onPress={register} title='Register'/>
          </View>
      </View>
    </View>
  )
}

export default Page