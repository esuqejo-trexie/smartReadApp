import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function SignUp() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { width, height } = useWindowDimensions();

  const handleSignUp = () => {
    if (!selectedUserType) {
      setModalVisible(true);
    } else {
      if (selectedUserType === "teacher") {
        router.push("/welcome_teacher");
      } else {
        router.push("/parent/welcome_parent");
      }
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center bg-white px-6"
      style={{ width, height }}
    >
      <Image
        source={require("../assets/images/SmartReadLogo.png")}
        style={{ width: width * 0.6, height: width * 0.6 }}
      />

      {/* Responsive text */}
      <Text className="text-center font-sans-medium text-gray-700 mb-4 text-2xl sm:text-3xl lg:text-4xl">
        PLEASE SELECT USER TYPE
      </Text>

      {/* User Type Buttons */}
      <View className="w-full mb-10">
        <TouchableOpacity
          className={`border-2 rounded-lg py-3 items-center mt-6 mb-6 ${
            selectedUserType === "teacher"
              ? "border-orange-400 bg-orange-100"
              : "border-orange-300"
          }`}
          onPress={() => setSelectedUserType("teacher")}
        >
          <Text className="text-xl sm:text-2xl lg:text-3xl text-secondary font-sans-semibold">
            TEACHER
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`border-2 rounded-lg py-3 items-center ${
            selectedUserType === "parent"
              ? "border-orange-400 bg-orange-100"
              : "border-orange-300"
          }`}
          onPress={() => setSelectedUserType("parent")}
        >
          <Text className="text-xl sm:text-2xl lg:text-3xl text-secondary font-sans-semibold">
            PARENT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        className="bg-primary w-full py-3 rounded-full items-center mb-4"
        onPress={handleSignUp}
      >
        <Text className="text-white text-3xl sm:text-4xl lg:text-5xl font-sans-medium">
          SIGN UP
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text className="text-xs sm:text-sm lg:text-base text-pink-600 underline">
          HAVE AN ACCOUNT? LOG IN
        </Text>
      </TouchableOpacity>

      {/* Modal for missing user type */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="bg-white p-6 rounded-2xl w-4/5 items-center shadow-lg"
            style={{ maxWidth: width * 0.9 }}
          >
            <Text className="text-2xl sm:text-3xl lg:text-4xl font-sans-bold text-secondary mb-4">
              Ooops!
            </Text>
            <Text className="text-center text-base sm:text-lg lg:text-xl font-sans-medium text-gray-700 mb-6">
              Please select a user type before signing up.
            </Text>
            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-full"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-xl font-sans-semibold">
                OKAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
