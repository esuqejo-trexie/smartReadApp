import { View, Text, ImageBackground, useWindowDimensions } from "react-native";

export default function SpellItRight() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-sans-bold text-txt_blue text-center">
          COMING SOON...
        </Text>
      </View>
    </ImageBackground>
  );
}
