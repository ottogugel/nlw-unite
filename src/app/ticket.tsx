import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'

import { Credential } from "@/components/Credential";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";

import { colors } from "@/styles/colors";
import { useState } from "react";
import { QrCode } from "@/components/QrCode";

export default function Ticket() {
  const [image, setImage] = useState("")
  const [expandQRCode, setExpandQRCode] = useState(false)

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if(result.assets){
        setImage(result.assets[0].uri)
        console.log(result.assets)
      }
    }catch (error) {
      console.log(error)
      Alert.alert("Picture", "The image could not be selected.");
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="My Credential" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential image={image} onChangeAvatar={handleSelectImage} onExpandQRCode={() => setExpandQRCode(true)} />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Share credentials
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Show the world you're going to the Unite Summit!
        </Text>

        <Button title="Share" />

        <TouchableOpacity activeOpacity={0.7} className="mt-10">
          <Text className="text-base text-white font-bold text-center">
            Remove Ticket
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="fade">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
            <QrCode value="teste" size={300} />
            <Text className="font-body text-orange-500 text-sm mt-10 text-center ">
              Close QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
