import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  Image,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

// Word/image pairs
const wordList = [
  {
    word: "CROW",
    image: require("../../../../assets/images/crow.png"),
  },
  {
    word: "WELL",
    image: require("../../../../assets/images/well.png"),
  },
  {
    word: "STONE",
    image: require("../../../../assets/images/stone.png"),
  },
];

const childAvatar = require("../../../../assets/images/child_avatar2.png");

export default function SpellItRightGame() {
  const { width, height } = useWindowDimensions();

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const [currentWordData, setCurrentWordData] = useState(getRandomWord());
  const [data, setData] = useState<{ key: string; label: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    shuffleLetters();
  }, [currentWordData]);

  const shuffleLetters = () => {
    let shuffled: { key: string; label: string }[] = [];
    const correct = currentWordData.word.split("");

    do {
      shuffled = correct
        .sort(() => Math.random() - 0.5)
        .map((letter, index) => ({ key: `${index}`, label: letter }));
    } while (
      shuffled.map((item) => item.label).join("") === currentWordData.word
    );

    setData(shuffled);
    setIsCorrect(false);
  };

  const checkAnswer = (letters: typeof data) => {
    const userWord = letters.map((item) => item.label).join("");
    if (userWord === currentWordData.word) {
      setIsCorrect(true);
      Alert.alert(
        "🎉 Correct!",
        `You spelled ${currentWordData.word} correctly!`
      );
    } else {
      setIsCorrect(false);
    }
  };

  const handleTryAgain = () => {
    shuffleLetters();
    setIsCorrect(false);
  };

  const handleNewWord = () => {
    setCurrentWordData(getRandomWord());
  };

  const renderItem = useCallback(
    ({
      item,
      drag,
      isActive,
    }: RenderItemParams<{ key: string; label: string }>) => (
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        className={`w-14 h-14 mx-1 rounded-xl justify-center items-center shadow-md ${
          isActive ? "bg-blue-300" : isCorrect ? "bg-green-300" : "bg-slate-200"
        }`}
      >
        <Text className="text-2xl font-extrabold text-blue-900">
          {item.label}
        </Text>
      </TouchableOpacity>
    ),
    [isCorrect]
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white/80" />

      {/* Child Avatar */}
      <Image
        source={childAvatar}
        className="w-16 h-16 absolute top-4 right-4 rounded-full border-4 border-white"
      />

      <View className="flex-1 justify-center items-center px-4">
        <View className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
          {/* Title */}
          <Text className="font-sans-bold text-3xl text-center text-primary mb-4">
            SPELL IT RIGHT
          </Text>

          {/* Word Image */}
          <View className="items-center mb-4">
            <Image
              source={currentWordData.image}
              className="w-40 h-40"
              resizeMode="contain"
            />
            <Text className="font-sans-medium text-lg text-gray-600 mt-2">
              Look at the picture above.
            </Text>
          </View>

          {/* Instructions */}
          <Text className="text-xl font-sans-semibold text-center text-blue-800 mb-2">
            Drag and arrange the letters below to spell the correct word.
          </Text>

          {/* Draggable Letters */}
          <View className="mt-4 mb-6">
            <DraggableFlatList
              data={data}
              onDragEnd={({ data: newData }) => {
                setData(newData);
                checkAnswer(newData);
              }}
              keyExtractor={(item) => item.key}
              horizontal
              renderItem={renderItem}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
              style={{ height: 80 }}
            />
          </View>

          {/* Feedback */}
          {isCorrect && (
            <Text className="text-center text-green-700 font-sans-semibold text-lg mb-4">
              ✅ Great job!
            </Text>
          )}

          {/* Buttons */}
          <View className="flex-row justify-center gap-4 space-x-4">
            {isCorrect ? (
              <>
                <TouchableOpacity
                  onPress={handleTryAgain}
                  className="bg-txt_blue px-4 py-2 rounded-xl shadow-md"
                >
                  <Text className="text-white font-semibold text-lg">
                    Try Again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNewWord}
                  className="bg-secondary px-4 py-2 rounded-xl shadow-md"
                >
                  <Text className="text-white font-semibold text-lg">
                    New Word
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text className="text-center text-secondary font-sans-medium text-lg mt-4">
                Keep trying to spell the word correctly!
              </Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
