import { Input } from '@/components/Input';
import { Button } from "@/components/Button";

import { View, Image, StatusBar  } from 'react-native'
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons'
import { Link } from 'expo-router';

import { colors } from '@/styles/colors';
import React from 'react';

export default function Register() {
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
          <Input.Field placeholder="Full name" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="E-mail" keyboardType="email-address" />
        </Input>

        <Button title="Register" />

        <Link href="/" className="text-gray-100 font-bold text-center mt-8">
          Already have a ticket?
        </Link>
      </View>
    </View>
  );
}