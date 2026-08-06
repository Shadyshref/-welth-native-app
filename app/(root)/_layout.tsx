import React from 'react'
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@clerk/expo';

export default function RootGroupLayout() {
  const {isSignedIn,isLoaded} = useAuth()
  if(!isLoaded) return null

  if(!isSignedIn) return <Redirect href="/sign-in"/>
  
  return (
    <Slot/>
  )
}