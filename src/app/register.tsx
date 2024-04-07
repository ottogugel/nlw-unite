import { Input } from '@/components/Input';
import { Button } from "@/components/Button";

import { api } from '@/server/api';

import { View, Image, StatusBar, Alert  } from 'react-native'
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons'
import { Link, router } from 'expo-router';

import { colors } from '@/styles/colors';
import React, { useState } from 'react';
import axios from 'axios';

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  // Validação do input de nome e email
  async function handleRegister() {
    try {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Registration", "Fill in all the fields!")
    }

    if(name.length<4) {
      Alert.alert("Registration", "The name must have more than 4 digits");
    }

    setIsLoading(true)

    const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, { name, email })

    if(registerResponse.data.attendeeId) {
      Alert.alert("Registration", "Registration successful", [
        { text: "OK", onPress: () => router.push("/ticket") },
      ]);
    }
  } catch(error) {
      console.log(error)
      setIsLoading(false)
      if(axios.isAxiosError(error)) {
        if(String(error.response?.data.message).includes("already registered")){
          return Alert.alert(
            "Registration",
            "This email address is already registered"
          );
        }
      }


      Alert.alert("Registration", "Unable to register")
    }
  }


  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Full name" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button title="Register" onPress={handleRegister} isLoading={isLoading} />

        <Link href="/" className="text-gray-100 font-bold text-center mt-8">
          Already have a ticket?
        </Link>
      </View>
    </View>
  );
}