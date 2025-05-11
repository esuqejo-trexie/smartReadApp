import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Image,
} from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { width, height } = useWindowDimensions();
  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-sans-bold">Profile Screen</Text>
      </View>
    </ImageBackground>
  );
}
