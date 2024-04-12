import { Input } from '@/components/Input';
import { Button } from "@/components/Button";

import { View, Image, StatusBar, Alert  } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router';

import { api } from '@/server/api';
import { useBadgeStore } from '@/store/badge-store'

import { colors } from '@/styles/colors';
import { useState } from 'react';

export default function Home() {

  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  // Validação do input de ticket
  async function handleAccessCredential() {
    try {
    if(!code.trim()){
      return Alert.alert("Ticket", "Enter the ticket code!");
    }

    setIsLoading(true)

    const { data } = await api.get(`/attendees/${code}/badge`)
    badgeStore.save(data.badge)
    } catch(error) {
      console.log(error)
      setIsLoading(false)
      Alert.alert("Ticket", "Ticket not found!");
    }
  }

  // Verificar o código da credencial e redirecionar p/ o ticket.
  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
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
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Ticket code" onChangeText={setCode} />
        </Input>

        <Button title="Access Credential" onPress={handleAccessCredential} isLoading={isLoading} />

        <Link
          href="/register"
          className="text-gray-100 font-bold text-center mt-8"
        >
          Don't have a ticket yet?
        </Link>
      </View>
    </View>
  );
}