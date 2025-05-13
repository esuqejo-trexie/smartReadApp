import React, { useState, useCallback } from "react";
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

const correctWord = "CROW";
const wordImage = require("../../../../assets/images/crow.png");
const childAvatar = require("../../../../assets/images/child_avatar2.png");

export default function SpellItRightGame() {
  const { width, height } = useWindowDimensions();

  const [data, setData] = useState(
    correctWord
      .split("")
      .sort(() => Math.random() - 0.5)
      .map((letter, index) => ({ key: `${index}`, label: letter }))
  );
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = (letters: typeof data) => {
    const userWord = letters.map((item) => item.label).join("");
    if (userWord === correctWord) {
      setIsCorrect(true);
      Alert.alert("🎉 Correct!", "You spelled CROW correctly!");
    } else {
      setIsCorrect(false);
    }
  };

  const resetWord = () => {
    setData(
      correctWord
        .split("")
        .sort(() => Math.random() - 0.5)
        .map((letter, index) => ({ key: `${index}`, label: letter }))
    );
    setIsCorrect(false);
  };

  const renderItem = useCallback(
    ({
      item,
      drag,
      isActive,
    }: RenderItemParams<{ key: string; label: string }>) => {
      return (
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          className={`w-14 h-14 mx-1 rounded-xl justify-center items-center shadow-md ${
            isActive
              ? "bg-blue-300"
              : isCorrect
              ? "bg-green-300"
              : "bg-slate-200"
          }`}
        >
          <Text className="text-2xl font-extrabold text-blue-900">
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [isCorrect]
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white/80" />

      {/* Child Avatar - top right */}
      <Image
        source={childAvatar}
        className="w-16 h-16 absolute top-4 right-4 rounded-full border-4 border-white"
      />

      <View className="flex-1 justify-center items-center px-4">
        <View className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
          {/* Game Title */}
          <Text className="font-sans-bold text-3xl text-center text-primary mb-4">
            SPELL IT RIGHT
          </Text>

          {/* Word Image */}
          <View className="items-center mb-4">
            <Image
              source={wordImage}
              className="w-40 h-40"
              resizeMode="contain"
            />
            <Text className="font-sans-medium text-lg text-gray-600 mt-2">
              Look at the picture above.
            </Text>
          </View>

          {/* Game Instruction */}
          <Text className="text-xl font-sans-semibold text-center text-blue-800 mb-2">
            Drag and arrange the letters below to spell the correct word.
          </Text>

          {/* Draggable List */}
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

          {/* Feedback Text */}
          {isCorrect && (
            <Text className="text-center text-green-700 font-sans-semibold text-lg mb-4">
              ✅ Great job!
            </Text>
          )}

          {/* Buttons for "Try Again" or "New Word" */}
          <View className="flex-row justify-center gap-4 space-x-4">
            {isCorrect ? (
              <>
                <TouchableOpacity
                  onPress={resetWord}
                  className="bg-txt_blue px-4 py-2 rounded-xl shadow-md"
                >
                  <Text className="text-white font-semibold text-lg">
                    Try Again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={resetWord}
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
