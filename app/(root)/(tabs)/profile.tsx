import { useAuth, useUser } from '@clerk/expo';
import {  useRouter } from 'expo-router';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Alert } from 'react-native'

export default function ProfileScreen() {

  const { user } = useUser()
  const {signOut} = useAuth()

  const router = useRouter()

  const handelSignOut = ()=>{
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {text:"Cancel",
      style:"cancel"
      },
      {"text":"Sign Out",
      style:"destructive",
      onPress:async ()=>{
        await signOut()
        router.replace("/(auth)/sign-in")
      }
      }
    ])
  }
  return (
    <SafeAreaView className="flex-1 bg-brand-body" edges={['top']}>
      <TouchableOpacity>
        <Text className="text-brand-blue font-bold text-sm" onPress={handelSignOut}>Sign Out</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}