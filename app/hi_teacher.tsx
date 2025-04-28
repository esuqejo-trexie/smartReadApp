import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";

export default function HiTeacher() {
  const [teacherName, setTeacherName] = useState("");
  const [error, setError] = useState("");
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [isShaking, setIsShaking] = useState(false);

  const handleContinue = () => {
    if (teacherName.trim() === "") {
      setError("Please enter your name.");
      triggerShake();
    } else {
      setError("");
      console.log("Teacher's Name:", teacherName);
      //router.push("/");
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
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
    ]).start(() => setIsShaking(false));
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-sans-semibold text-txt_blue mb-4">
          HI, TEACHER!
        </Text>
        <Text className="text-center text-md font-sans-regular text-gray-700 mb-4">
          What does your students call you?
        </Text>

        <View style={{ width: "100%" }}>
          {error ? (
            <Text className="text-red-500 text-sm mb-1 ml-2">{error}</Text>
          ) : null}

          <Animated.View
            style={{
              transform: [{ translateX: shakeAnimation }],
              width: "100%",
            }}
          >
            <TextInput
              value={teacherName}
              onChangeText={setTeacherName}
              placeholder="Enter your name"
              maxLength={40}
              className={`w-full border ${
                isShaking || error ? "border-red-500" : "border-gray-500"
              } rounded-lg p-3 bg-white font-sans-regular mt-2 mb-10`}
            />
          </Animated.View>
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-primary w-full py-3 rounded-full mb-4"
        >
          <Text className="text-white text-xl font-sans-medium text-center">
            CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
