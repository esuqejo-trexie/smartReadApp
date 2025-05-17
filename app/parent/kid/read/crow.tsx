import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ScrollView,
  useWindowDimensions,
  Modal,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const router = useRouter();

const storyPages: string[] = [
  'On a hot summer day, a thirsty crow looked for water to drink. "It\'s hot! I am thirsty!" said the crow. "I need to find water."',
  "The crow flew from one place to another looking for water to drink. He finally found a pitcher near a well. But there was only little water in the pitcher.",
  'He tried to drink from the pitcher but no matter how much he tried, he could not reach the water. "My beak is too big. The pitcher\'s neck is very narrow. How will I get the water?" he thought.',
  'Then an idea came to the crow. He picked up some small stones. "One, two, three…" Plop, plip, plop.',
  'Little by little, the water rose in the pitcher. "Four, five, six…" Plop, plip, plop. The water rose some more. Soon the crow could reach the water.',
  '"Now, I can drink!" said the crow. "Ah! It\'s cold and good!"',
];

const storyImages: any[] = [
  require("../../../../assets/images/story/p1.png"),
  require("../../../../assets/images/story/p2.png"),
  require("../../../../assets/images/story/p3.png"),
  require("../../../../assets/images/story/p4.png"),
  require("../../../../assets/images/story/p5.png"),
  require("../../../../assets/images/story/p6.png"),
];

interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
}

export default function CrowStory() {
  const [page, setPage] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [readingTime, setReadingTime] = useState(60);

  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const imageWidth = Math.min(width * 0.9, 400);
  const imageHeight = (imageWidth * 3) / 2 - 25;

  const updateProgress = (nextPage: number) => {
    const progress = (nextPage + 1) / storyPages.length;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const changePage = (nextPage: number) => {
    Speech.stop();
    setShowPrompt(false);
    setIsReading(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPage(nextPage);
      updateProgress(nextPage);
      setAccuracy(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        handleSpeak(nextPage);
      });
    });
  };

  const handleSpeak = (pageIndex: number = page) => {
    setShowPrompt(false);
    setIsReading(true);
    Speech.speak(storyPages[pageIndex], {
      rate: 0.6,
      pitch: 1.0,
      language: "en-US",
      onDone: () => {
        setIsReading(false);
        setShowPrompt(true);
      },
    });
  };

  const handleStop = () => {
    Speech.stop();
    setIsReading(false);
    setShowPrompt(false);
  };

  const handleStartListening = () => {
    setIsListening(true);
    // Placeholder: integrate speech-to-text later
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handleSpeechRecognition = (recognizedText: string) => {
    if (recognizedText === storyPages[page]) {
      setAccuracy(100);
    } else {
      setAccuracy(
        Math.floor((recognizedText.length / storyPages[page].length) * 100)
      );
    }
  };

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.4,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  useEffect(() => {
    updateProgress(page);
    handleSpeak(page);
  }, []);

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the title of the story you read?",
      options: ["The Crow and The Pitcher", "The Clever Fox", "The Lazy Dog"],
      correct: "The Crow and The Pitcher",
    },
  ];

  const handleQuizAnswer = (qIndex: number, option: string) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const quizScore = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) score++;
    });
    return score;
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    setIsQuizVisible(false);
    setIsModalVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#FEF0F2]"
    >
      <View className="w-full bg-gray-200 h-2 mb-4">
        <Animated.View
          style={{
            height: 8,
            backgroundColor: "#FF3D67",
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </View>

      <View className="flex-1 justify-center items-center px-4">
        <Animated.Image
          source={storyImages[page]}
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: isSmallDevice ? 2 : 4,
            borderRadius: 16,
            resizeMode: "contain",
            opacity: fadeAnim,
          }}
        />

        <Animated.Text
          className={`font-sans-regular text-center mb-4 ${
            isSmallDevice ? "text-lg" : "text-xl"
          }`}
          style={{
            opacity: fadeAnim,
            maxWidth: imageWidth,
            paddingHorizontal: 8,
          }}
        >
          {storyPages[page]}
        </Animated.Text>

        {showPrompt && (
          <Text className="text-lg font-semibold text-blue-700 mb-2">
            Your turn! Use the mic to read the story.
          </Text>
        )}

        <View className="mb-4">
          <Text className="text-lg">Reading Accuracy: {accuracy}%</Text>
          <View className="w-full bg-gray-200 h-2 mt-2">
            <Animated.View
              style={{
                height: 8,
                backgroundColor: "#4CAF50",
                width: `${accuracy}%`,
              }}
            />
          </View>
        </View>

        <View className="flex-row justify-center space-x-4 mb-4 gap-4">
          <Pressable
            onPress={() => handleSpeak(page)}
            className="bg-purple-500 p-3 rounded-full items-center justify-center"
          >
            <MaterialIcons name="volume-up" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={handleStop}
            className="bg-red-500 p-3 rounded-full items-center justify-center"
          >
            <MaterialIcons name="stop" size={24} color="white" />
          </Pressable>

          {!isReading && (
            <View className="relative items-center justify-center">
              {isListening && (
                <Animated.View
                  style={{
                    position: "absolute",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#3B82F6",
                    transform: [{ scale: pulseAnim }],
                    opacity: 0.5,
                    zIndex: -1,
                  }}
                />
              )}
              <Pressable
                onPress={
                  isListening ? handleStopListening : handleStartListening
                }
                className="bg-blue-500 p-3 rounded-full items-center justify-center"
                style={{ width: 60, height: 60 }}
              >
                <MaterialIcons
                  name={isListening ? "mic" : "mic-off"}
                  size={28}
                  color="white"
                />
              </Pressable>
            </View>
          )}
        </View>

        <View className="flex-row justify-between w-full max-w-md px-2 mb-2">
          {page > 0 && (
            <Pressable
              onPress={() => changePage(page - 1)}
              className="bg-blue-500 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold">Previous</Text>
            </Pressable>
          )}
          {page < storyPages.length - 1 && (
            <Pressable
              onPress={() => changePage(page + 1)}
              className="bg-green-500 px-4 py-2 rounded-xl ml-auto"
            >
              <Text className="text-white font-semibold">Next</Text>
            </Pressable>
          )}
          {page === storyPages.length - 1 && (
            <Pressable
              onPress={() => setIsQuizVisible(true)}
              className="bg-green-500 px-4 py-2 rounded-xl ml-auto"
            >
              <Text className="text-white font-semibold">Finish</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Quiz Modal */}
      <Modal transparent visible={isQuizVisible} animationType="fade">
        <View className="flex-1 justify-center items-center px-6 absolute inset-0 bg-[#FEF0F2] bg-opacity-50">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80%]">
            <Text className="text-2xl font-sans-bold mb-4 text-center">
              Quiz Time! 🎓
            </Text>
            <ScrollView>
              {quizQuestions.map((q, i) => (
                <View key={i} className="mb-6">
                  <Text className="font-semibold mb-2">{q.question}</Text>
                  {q.options.map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => handleQuizAnswer(i, option)}
                      className={`py-2 px-4 rounded-md mb-1 border ${
                        quizAnswers[i] === option
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                    >
                      <Text>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>

            <Pressable
              onPress={finishQuiz}
              disabled={
                Object.keys(quizAnswers).length !== quizQuestions.length
              }
              className={`${
                Object.keys(quizAnswers).length === quizQuestions.length
                  ? "bg-purple-600"
                  : "bg-gray-400"
              } mt-4 py-2 rounded-xl`}
            >
              <Text className="text-white text-center font-semibold">
                Submit Quiz
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Congratulations Modal */}
      <Modal transparent visible={isModalVisible} animationType="fade">
        <View className="flex-1 justify-center items-center px-6 absolute inset-0 bg-[#FEF0F2] bg-opacity-50">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <Text className="text-3xl font-sans-bold text-center text-green-700 mb-2">
              Congratulations!
            </Text>
            <Text className="text-md mt-4">
              <Text className="font-sans-semibold">Reading Time: </Text>
              {readingTime} seconds
            </Text>
            <Text className="text-md">
              <Text className="font-sans-semibold">Accuracy: </Text>
              {accuracy}%
            </Text>
            {quizFinished && (
              <Text className="text-md mt-2">
                <Text className="font-sans-semibold">Quiz Score: </Text>
                {quizScore()} / {quizQuestions.length}
              </Text>
            )}

            <Pressable
              onPress={() => {
                setIsModalVisible(false);
                setQuizAnswers({});
                setQuizFinished(false);
                router.push("/parent/kid/(tabs)/kid_homepage");
              }}
              className="mt-6 bg-green-500 py-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
