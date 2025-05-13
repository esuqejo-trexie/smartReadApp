import { ImageBackground, Text, View, useWindowDimensions } from "react-native";

export default function ReadPage() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      {/* Optional white overlay */}
      <View className="absolute inset-0 bg-white opacity-90" />

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-sans-bold text-txt_blue text-center">
          Let’s Read a Story! 📚
        </Text>
        <Text className="text-xl mt-4 font-sans text-txt_blue text-center">
          Pick a book and start your adventure!
        </Text>
      </View>
    </ImageBackground>
  );
}
