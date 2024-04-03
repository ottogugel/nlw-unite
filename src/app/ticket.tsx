import { Credential } from "@/components/Credential";
import { Header } from "@/components/Header";
import { StatusBar, View } from "react-native";

export default function Ticket() {
  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="My Credential" />
      <Credential />
    </View>
  );
}