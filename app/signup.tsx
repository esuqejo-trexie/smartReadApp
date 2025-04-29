import { Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function SignUp() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = () => {
    if (!selectedUserType) {
      setModalVisible(true);
    } else {
      if (selectedUserType === "teacher") {
        router.push("/welcome_teacher");
      } else {
        // For example, you could navigate to another page like '/welcome_parent'
        // router.push("/welcome_parent");
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        source={require("../assets/images/SmartReadLogo.png")}
        className="w-60 h-60 mb-5"
        resizeMode="contain"
      />

      <Text className="font-sans-medium text-gray-700 mb-4">
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
          <Text className="text-xl text-secondary font-sans-semibold">
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
          <Text className="text-xl text-secondary font-sans-semibold">
            PARENT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        className="bg-primary w-full py-3 rounded-full items-center mb-4"
        onPress={handleSignUp}
      >
        <Text className="text-white text-3xl font-sans-medium">SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          /* Handle login navigation here */
        }}
      >
        <Text className="text-xs text-pink-600 underline">
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
          <View className="bg-white p-6 rounded-2xl w-4/5 items-center shadow-lg">
            <Text className="text-2xl font-sans-bold text-secondary mb-4">
              Ooops!
            </Text>
            <Text className="text-center text-base font-sans-medium text-lg text-gray-700 mb-6">
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
