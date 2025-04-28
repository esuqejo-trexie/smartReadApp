import { Text, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Logo */}
      <Image
        source={require("../assets/images/SmartReadLogo.png")}
        className="w-80 h-80 mb-5"
        resizeMode="contain"
      />

      {/* Tagline */}
      <Text className="text-center text-2xl text-gray-800 font-sans-semibold mb-1">
        Ignite your reading,
      </Text>
      <Text className="text-center text-2xl text-gray-800 font-sans-semibold mb-10">
        Spark your imagination.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        className="bg-primary mt-20 px-10 py-3 rounded-full"
        onPress={goToSignUp}
      >
        <Text className="text-center text-3xl text-white font-sans-medium">
          GET STARTED
        </Text>
      </TouchableOpacity>
    </View>
  );
}
