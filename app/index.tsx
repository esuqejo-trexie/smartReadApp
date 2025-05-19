import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";

export default function Index() {
  const { width, height } = useWindowDimensions();

  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Logo */}
      <Image
        source={require("../assets/images/SmartReadLogo.png")}
        style={{
          width: width * 0.8,
          height: width * 0.8,
        }}
        resizeMode="contain"
        className="mb-5"
      />

      {/* Tagline */}
      <Text className="text-center text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-sans-semibold mb-1">
        Ignite your reading,
      </Text>
      <Text className="text-center text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-sans-semibold mb-10">
        Spark your imagination.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        className="bg-primary mt-20 px-10 py-3 rounded-full"
        onPress={goToSignUp}
        style={{
          paddingHorizontal: width * 0.1,
          paddingVertical: height * 0.03,
        }}
      >
        <Text className="text-center text-3xl sm:text-4xl lg:text-5xl text-white font-sans-medium">
          GET STARTED
        </Text>
      </TouchableOpacity>
    </View>
  );
}
