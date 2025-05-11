import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
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
      {/* Optional white overlay */}
      <View className="absolute inset-0 bg-white opacity-90" />

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-sans-bold text-txt_blue text-center">
          Welcome to the Parent's Home!
        </Text>
      </View>
    </ImageBackground>
  );
}
