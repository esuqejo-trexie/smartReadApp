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

type Avatar = "teach_avatar1" | "teach_avatar2" | "teach_avatar3";

const avatars: { [key in Avatar]: any } = {
  teach_avatar1: require("../assets/images/teach_avatar1.png"),
  teach_avatar2: require("../assets/images/teach_avatar2.png"),
  teach_avatar3: require("../assets/images/teach_avatar3.png"),
};

export default function HiTeacher() {
  const { width, height } = useWindowDimensions();
  const [teacherName, setTeacherName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null); // Set selected avatar type
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleContinue = () => {
    if (teacherName.trim() === "") {
      setError("Please enter your name.");
      triggerShake();
    } else if (!selectedAvatar) {
      setError("Please select an avatar.");
    } else {
      setError("");
      router.push("/(tabs)/home_teacher");
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
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl sm:text-5xl lg:text-6xl font-sans-semibold text-txt_blue mb-4">
          HI, TEACHER!
        </Text>
        <Text className="text-center text-md sm:text-lg lg:text-xl font-sans-regular text-gray-700 mb-4">
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

        {/* Avatar Selection Section */}
        <Text className="text-center text-md sm:text-lg lg:text-xl font-sans-regular text-gray-700 mb-4">
          Choose your avatar:
        </Text>
        <View className="flex-row justify-around mb-8">
          {["teach_avatar1", "teach_avatar2", "teach_avatar3"].map(
            (avatar, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAvatar(avatar as Avatar)}
                style={{ marginHorizontal: 10 }}
              >
                <Image
                  source={avatars[avatar as Avatar]}
                  style={{
                    width: width * 0.25,
                    height: width * 0.25,
                    borderRadius: (width * 0.25) / 2,
                    borderWidth: selectedAvatar === avatar ? 4 : 0,
                    borderColor:
                      selectedAvatar === avatar ? "#00A9E0" : "transparent",
                  }}
                  className="mt-7 mb-10"
                />
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-primary w-full py-3 rounded-full mb-4"
        >
          <Text className="text-white text-xl sm:text-2xl lg:text-3xl font-sans-medium text-center">
            CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
