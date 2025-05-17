import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";

export default function HomeParent() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />

      <View className="flex-1 justify-start items-center px-6 pt-8">

        <Text className="text-4xl font-sans-bold text-blue-500 mb-7">
          Welcome Mrs. Mary!
        </Text>

        <View className="flex-row items-center mb-9 bg-white rounded-lg p-4 shadow-md">
          <Image
            source={require("../../../assets/images/parent_avatar1.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View className="ml-4">
            <Text className="text-2xl font-sans-bold text-purple-500">Mrs. Mary</Text>
            <Text className="text-sm font-sans-semibold text-gray-600">Parent</Text>
          </View>
        </View>

        <View className="w-full mt-2 bg-yellow-200 rounded-lg p-4">
          <Text className="text-lg font-sans-bold text-black">✨Word of the Day✨</Text>
          <Text className="text-base font-sans-semibold text-gray-600">
            Epiphany - an illuminating discovery, realization, or disclosure.
          </Text>
        </View>

        <View className="w-full mt-4 bg-red-300 rounded-lg p-4">
          <Text className="text-lg font-sans-bold text-black">👧 Alyssa's Progress</Text>
          <Text className="text-base font-sans-semibold text-gray-800">⭐ Current Level: Beginner 🌱</Text>
          <Text className="text-base font-sans-semibold text-gray-800">📚 Last Story: The Crow and The Pitcher</Text>
          <Text className="text-base font-sans-semibold text-gray-800">📊 Accuracy: 92%</Text>
        </View>

        <View className="flex-row justify-around w-full mt-6">
          <View className="bg-white rounded-lg shadow-md p-4 mx-2 items-center">
            <Text className="text-3xl font-sans-bold text-orange-600">3</Text>
            <Text className="text-lg font-sans-semibold text-center">Alyssa's Badges</Text>
          </View>
          <View className="bg-white rounded-lg shadow-md p-4 mx-2 items-center">
            <Text className="text-3xl font-sans-bold text-orange-600">5</Text>
            <Text className="text-lg font-sans-semibold text-center">Alyssa's Fun Activities</Text>
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-xl font-sans-bold text-red-500">Alyssa's Recent Activities</Text>
          <Text className="text-lg font-sans-semibold">• Completed reading "The Pitcher and The Crow"</Text>
        </View>

        <View className="mt-4 w-full">
          <Text className="text-xl font-sans-bold text-red-500">Messages</Text>
          <Text className="text-lg font-sans-semibold">• Teacher Carla sent you a message</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
