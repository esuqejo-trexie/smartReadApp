import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";

export default function WelcomeTeacher() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinue = () => {
    if (email.trim() === "") {
      setError("Email address is required.");
      triggerShake();
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      triggerShake();
    } else {
      setError("");
      console.log("Email entered:", email);
      router.push("/hi_teacher");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-sans-semibold text-txt_blue mb-4">
          WELCOME!
        </Text>

        <Text className="text-center text-md font-sans-regular text-gray-700 mb-4">
          Create an account to monitor your learner’s skill progress.
        </Text>

        {error !== "" && (
          <Text className="text-red-500 w-full text-left mb-2 text-sm">
            {error}
          </Text>
        )}

        <Animated.View
          style={{
            width: "100%",
            transform: [{ translateX: shakeAnimation }],
          }}
        >
          <TextInput
            placeholder="Email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            className={`h-12 border rounded-lg px-4 mt-2 mb-10 ${
              error ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Animated.View>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-primary w-full py-3 rounded-full mb-4"
        >
          <Text className="text-white text-xl font-sans-medium text-center">
            CONTINUE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-gray-300 w-full py-3 rounded-full flex-row justify-center items-center mt-20 mb-4"
          onPress={() => console.log("Google Sign Up clicked")}
        >
          <Image
            source={require("../assets/images/google-icon.png")}
            className="w-6 h-6 mr-2"
            resizeMode="contain"
          />
          <Text className="text-xl text-gray-700 font-sans-medium">
            SIGN UP WITH GOOGLE
          </Text>
        </TouchableOpacity>

        {/* Terms and Privacy Policy */}
        <Text className="text-xs text-gray-500 text-center mt-4">
          By signing in to SmartRead, you agree to our{" "}
          <Text className="text-pink-600">Terms</Text> and{" "}
          <Text className="text-pink-600">Privacy Policy</Text>.
        </Text>
      </View>
    </ImageBackground>
  );
}
