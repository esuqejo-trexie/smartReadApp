import { ImageBackground, Text, View, useWindowDimensions } from "react-native";

export default function BookScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      {/* Optional white overlay */}
      <View className="absolute inset-0 bg-white opacity-90" />

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl">Book Screen</Text>
      </View>
    </ImageBackground>
  );
}
