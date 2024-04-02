import { Input } from '@/components/Input';
import { View, Image, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors';

export default function Home() {
  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color={colors.green[200]}
          />
          <Input.Field placeholder="Ticket code"></Input.Field>
        </Input>
      </View>

      <View className="w-full mt-12 h-16 border bg-orange-500 rounded-lg">
        <Pressable>
          <Text className="items-center justify-center">
            Acessar Credencial
          </Text>
        </Pressable>
      </View>

      <View className="p-8">
        <Text className="text-white font-bold text-base">
          Ainda não possui ingresso?
        </Text>
      </View>
    </View>
  );
}