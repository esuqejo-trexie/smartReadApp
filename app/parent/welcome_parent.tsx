// app/parent/welcome_parent.tsx
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";

export default function WelcomeParent() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email address is required.");
      triggerShake();
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      triggerShake();
    } else if (password.trim() === "") {
      setPasswordError("Password is required.");
      triggerShake();
    } else if (password.length < 8 || password.length > 16) {
      setPasswordError("Password must be between 8 and 16 characters.");
      triggerShake();
    } else {
      router.push("/parent/hi_parent");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl sm:text-5xl lg:text-6xl font-sans-semibold text-txt_blue mb-4">
          WELCOME!
        </Text>
        <Text className="text-center text-md sm:text-lg lg:text-xl font-sans-regular text-gray-700 mb-4">
          Create an account to support your child’s reading journey.
        </Text>

        {emailError !== "" && (
          <Text className="text-red-500 w-full text-left mb-2 text-sm">
            {emailError}
          </Text>
        )}

        <Animated.View
          style={{ width: "100%", transform: [{ translateX: shakeAnimation }] }}
        >
          <TextInput
            placeholder="Email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            className={`h-12 border rounded-lg px-4 mt-2 mb-4 ${
              emailError ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Animated.View>

        {passwordError !== "" && (
          <Text className="text-red-500 w-full text-left mb-2 text-sm">
            {passwordError}
          </Text>
        )}

        <Animated.View
          style={{ width: "100%", transform: [{ translateX: shakeAnimation }] }}
        >
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            className={`h-12 border rounded-lg px-4 mt-2 mb-10 ${
              passwordError ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Animated.View>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-primary w-full py-3 rounded-full mb-4"
        >
          <Text className="text-white text-xl sm:text-2xl lg:text-3xl font-sans-medium text-center">
            CONTINUE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-gray-300 w-full py-3 rounded-full flex-row justify-center items-center mt-20 mb-4"
          onPress={() => {
            /* Handle Google Sign Up here */
          }}
        >
          <Image
            source={require("../../assets/images/google-icon.png")}
            style={{ width: width * 0.1, height: width * 0.1 }}
            resizeMode="contain"
            className="mx-2 mr-4"
          />
          <Text className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-sans-medium">
            SIGN UP WITH GOOGLE
          </Text>
        </TouchableOpacity>

        <Text className="text-xs sm:text-sm lg:text-base text-gray-500 text-center mt-4">
          By signing in to SmartRead, you agree to our{" "}
          <Text className="text-primary">Terms</Text> and{" "}
          <Text className="text-primary">Privacy Policy</Text>.
        </Text>
      </View>
    </ImageBackground>
  );
}
