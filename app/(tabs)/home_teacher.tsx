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

export default function HomeTeacher() {
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
        <Text className="text-4xl font-sans-bold text-txt_blue text-center">
          Welcome to the Teacher's Home!
        </Text>
      </View>
    </ImageBackground>
  );
}
