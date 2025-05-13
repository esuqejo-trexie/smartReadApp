import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

export default function MiniGames() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6 space-y-6">
        <Text className="text-4xl font-sans-bold text-txt_blue text-center">
          Time to Play!
        </Text>
        <Text className="text-xl font-sans-medium text-secondary text-center">
          Ready for some fun mini games?
        </Text>

        {/* Game Buttons */}
        <View className="w-full mt-8 space-y-5">
          <Link href="/parent/kid/games/spell_it_right" asChild>
            <TouchableOpacity className="bg-blue-500 py-4 px-6 rounded-2xl shadow-lg mb-5">
              <Text className="font-sans-bold text-white text-lg text-center font-semibold">
                🔤 Spell it Right
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/parent/kid/games/match_word" asChild>
            <TouchableOpacity className="bg-green-500 py-4 px-6 rounded-2xl shadow-lg mb-5">
              <Text className="font-sans-bold text-white text-lg text-center font-semibold">
                🧠 Match the Word
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/parent/kid/games/sentence_scramble" asChild>
            <TouchableOpacity className="bg-purple-500 py-4 px-6 rounded-2xl shadow-lg">
              <Text className="font-sans-bold text-white text-lg text-center font-semibold">
                🧩 Sentence Scramble
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}
