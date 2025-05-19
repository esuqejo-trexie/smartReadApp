import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { router } from "expo-router";

type Avatar = "parent_avatar1" | "parent_avatar2" | "parent_avatar3";

const avatars: { [key in Avatar]: any } = {
  parent_avatar1: require("../../assets/images/parent_avatar1.png"),
  parent_avatar2: require("../../assets/images/parent_avatar2.png"),
  parent_avatar3: require("../../assets/images/parent_avatar3.png"),
};

export default function HiParent() {
  const { width, height } = useWindowDimensions();
  const [studentCode, setStudentCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showModal, setShowModal] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const isValidCode = (code: string) => /^[A-Za-z0-9]{6}$/.test(code);

  const handleContinue = () => {
    if (studentCode.trim() === "") {
      setError("Please enter your student's code.");
      triggerShake();
    } else if (!isValidCode(studentCode)) {
      setError("Invalid Code");
      triggerShake();
    } else if (studentCode !== "ABC123") {
      setError("Code not found.");
      triggerShake();
    } else if (!selectedAvatar) {
      setError("Please select an avatar.");
    } else {
      setError("");
      setShowModal(true); // show confirmation modal
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

  const handleModalConfirm = () => {
    setShowModal(false);
    router.push("/parent/(tabs)/home_parent");
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
          HI, PARENT!
        </Text>
        <Text className="text-center text-md sm:text-lg lg:text-xl font-sans-regular text-gray-700 mb-4">
          Please enter your child's code:
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
              value={studentCode}
              onChangeText={setStudentCode}
              placeholder="Enter student code"
              maxLength={6}
              autoCapitalize="characters"
              className={`w-full border ${
                isShaking || error ? "border-red-500" : "border-gray-500"
              } rounded-lg p-3 bg-white font-sans-regular mt-2 mb-10`}
            />
          </Animated.View>
        </View>

        <Text className="text-center text-md sm:text-lg lg:text-xl font-sans-regular text-gray-700 mb-4">
          Choose your avatar:
        </Text>
        <View className="flex-row justify-around mb-8">
          {Object.keys(avatars).map((avatar, index) => (
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
          ))}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="bg-white p-6 rounded-2xl w-4/5 items-center shadow-lg"
            style={{ maxWidth: width * 0.9 }}
          >
            <Text className="text-2xl sm:text-3xl lg:text-4xl font-sans-bold text-secondary mb-4">
              Just Checking...
            </Text>
            <Text className="text-center text-base sm:text-lg lg:text-xl font-sans-medium text-gray-700 mb-6">
              Are you MARY and is ALYSSA your child?
            </Text>
            <View className="flex-row justify-between w-full px-4">
              <TouchableOpacity
                className="bg-gray-300 px-6 py-2 rounded-full flex-1 mr-2"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-gray-700 text-lg font-sans-semibold text-center">
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary px-6 py-2 rounded-full flex-1 ml-2"
                onPress={handleModalConfirm}
              >
                <Text className="text-white text-lg font-sans-semibold text-center">
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
