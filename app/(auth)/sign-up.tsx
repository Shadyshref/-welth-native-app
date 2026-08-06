import {   CodeSchema, SignUpFormSchemaValue,SignUpSchema } from "@/lib/schemas/auth";
import { useAuth, useSignUp } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

export default function SignUp() {
  const {signUp,errors,fetchStatus}=useSignUp()
  const {isSignedIn} = useAuth()
  const router = useRouter()


const isLoading = fetchStatus === "fetching"

  const [email,setEmail] = useState("")
  const {
    control,handleSubmit,formState:{errors:formErrors},} = useForm<SignUpFormSchemaValue>({
      resolver:zodResolver(SignUpSchema),
      mode:"onBlur",
      defaultValues:{firstName:"",lastName:"",email:"",password:""}
    });


   const {
    control:codeControl,
    handleSubmit:handleCodeSubmit,
    formState:{errors:codeErrors},
   } = useForm<{code:string}>({
      resolver:zodResolver(CodeSchema),
      mode:"onBlur",
      defaultValues:{code:""}
    })

     const onSignUpPress = async (values:SignUpFormSchemaValue)=>{
      setEmail(values.email)
      const {error}= await signUp.password({
        firstName:values.firstName,
        lastName:values.lastName,
        emailAddress:values.email,
        password:values.password
      })
      if(error){
        console.error(JSON.stringify(error,null,2))
        return
      }
      if(!error) await signUp.verifications.sendEmailCode()
     }


     const onVerifyCodePress = async ({code}:{code:string})=>{
      await signUp.verifications.verifyEmailCode({code})

      if(signUp.status === "complete"){
        await signUp.finalize({
          navigate:({session,decorateUrl})=>{
            if(session?.currentTask) return
            const url = decorateUrl("/")
            router.replace(url as any)
          }
        })
      }else{
        console.error("Sign up not complete",signUp)
      }
     };
     if(isSignedIn || signUp.status === "complete"){
      return null
     }

     if(
      signUp.status ===  "missing_requirements" &&
      signUp.unverifiedFields.includes("email_address") &&
      signUp.missingFields.length===0
     ){
      return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-brand-body" >
          <View className="flex-1 justify-center px-6 -mt-16">
            <Image
            source={require("../../assets/images/welth.png")}
            className="w-36 h-16  mb-8"
            resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-[#1A1AD26] mb-2 leading-tight">Verify your account</Text>
            <Text className="text-base text-brand-text-muted mb-8 ">We sent a verification code to {email}</Text>
            <Controller 
          control={codeControl}
          name="code"
          render={({field:{onChange,onBlur,value}})=>{
            return (
              <TextInput className=" border mb-2  border-[#E8E6DF] bg-white
               rounded-xl px-4 py-3 text-[#1A1D26] "
               placeholder="Verification Code"
               placeholderTextColor="#8A8D69"
               value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />

            )
          }
          }
        />
        {codeErrors.code && (
          <Text className="text-brand-coral text-sm mb-2">{codeErrors.code.message}</Text>
        )}
        {errors.fields.code &&(
          <Text className="text-brand-coral text-sm mb-2">{errors.fields.code.message}</Text>
        )}
        <TouchableOpacity onPress={handleCodeSubmit(onVerifyCodePress)}
      disabled={isLoading}
      
      className="w-full bg-brand-blue py-4 rounded-xl items-center mb-4">
        {isLoading ? (
          <ActivityIndicator color="white" />
        ):(
          <Text className="text-white font-bold text-base">Verify</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>signUp.verifications.sendEmailCode()} className="py-2">
        <Text className="text-brand-blue font-bold text-sm"> I need a new code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> signUp.reset()} className="py-2">
        <Text className="text-brand-blue font-bold text-sm">Change Email</Text>
      </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      )
     }


  return (
   <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-brand-body">

    <View className="flex-1  justify-center px-6 -mt-16">  
      <Image
      source={require("../../assets/images/welth.png")}
      className="w-36 h-16  mb-8"
      resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-[#1A1D26] mb-4 leading-tight">Create an account</Text>
      <Text className="text-base text-brand-text-muted mb-8 ">Track your money powered by ai</Text>
      
      <View className="flex-row gap-3 mb-2">
        <Controller 
          control={control}
          name="firstName"
          render={({field:{onChange,onBlur,value}})=>{
            return (
              <TextInput className="flex-1 border border-[#E8E6DF] bg-white
               rounded-xl px-4 py-3 text-[#1A1D26] "
               placeholder="First Name"
               placeholderTextColor="#8A8D69"
               value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
              />

            )
          }
          }
        />
        <Controller 
          control={control}
          name="lastName"
          render={({field:{onChange,onBlur,value}})=>{
            return (
              <TextInput className="flex-1 border  border-[#E8E6DF] bg-white
               rounded-xl px-4 py-3 text-[#1A1D26] "
               placeholder="Last Name"
               placeholderTextColor="#8A8D69"
               value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
              />

            )
          }
          }
        />
      </View>
      {(formErrors.firstName || formErrors.lastName) && (
        <Text className="text-brand-coral text-sm mb-2">{formErrors.firstName?.message || formErrors.lastName?.message}</Text>
      )}
       <Controller 
          control={control}
          name="email"
          render={({field:{onChange,onBlur,value}})=>{
            return (
              <TextInput className=" border mb-2  border-[#E8E6DF] bg-white
               rounded-xl px-4 py-3 text-[#1A1D26] "
               placeholder="Email"
               placeholderTextColor="#8A8D69"
               value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />

            )
          }
          }
        />
        {formErrors.email && (
          <Text className="text-brand-coral text-sm mb-2">{formErrors.email.message}
          </Text>
        )}
        {errors.fields.emailAddress &&(
          <Text className="text-brand-coral text-sm mb-2">{errors.fields.emailAddress.message}</Text>
        )}
        <Controller 
          control={control}
          name="password"
          render={({field:{onChange,onBlur,value}})=>{
            return (
              <TextInput className=" border mb-2 border-[#E8E6DF] bg-white
               rounded-xl px-4 py-3 text-[#1A1D26] "
               placeholder="Password"
               placeholderTextColor="#8A8D69"
               value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                
                secureTextEntry
              />

            )
          }
          }
        />
        {formErrors.password && (
          <Text className="text-brand-coral text-sm mb-2">{formErrors.password.message}
          </Text>
        )}
        {errors.fields.password &&(
          <Text className="text-brand-coral text-sm mb-2">{errors.fields.password.message}</Text>
        )}
      
      <TouchableOpacity onPress={handleSubmit(onSignUpPress)}
      disabled={isLoading}
      
      className="w-full bg-brand-blue py-4 rounded-xl items-center mb-4">
        {isLoading ? (
          <ActivityIndicator color="white" />
        ):(
          <Text className="text-white font-bold text-base">Sign Up</Text>
        )}
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text className="text-brand-text-muted text-sm">Already have an account?{" "} </Text>
        <Link href="/sign-in">
          <Text className="text-brand-blue font-bold text-sm">Sign In</Text>
        </Link>

      </View>

      {/* // required by clerk for bot protection */}
      <View nativeID="clerk-captcha"/>

    </View>
    
   </KeyboardAvoidingView>
  );
}