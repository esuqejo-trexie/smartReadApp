import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const TIP_TEXT =
  "Take your time to sound out tricky words — it helps your brain remember them better!";
const WORD_TEXT =
  "Serendipity — finding something good without looking for it.";

function TipWordToggle() {
  const { width } = useWindowDimensions();
  const containerPadding = width * 0.05;

  const [showTip, setShowTip] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowTip((prev) => !prev);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        marginHorizontal: containerPadding,
        marginTop: 20,
        padding: containerPadding,
        opacity: fadeAnim,
      }}
      className="rounded-2xl bg-yellow-100 shadow-lg shadow-black/10"
    >
      <Text className="font-sans-semibold text-yellow-700 text-lg mb-2">
        {showTip ? "💡 Tip of the Day" : "🌟 Word of the Day"}
      </Text>
      <Text className="font-sans-regular text-yellow-900 text-base">
        {showTip ? TIP_TEXT : WORD_TEXT}
      </Text>
    </Animated.View>
  );
}

export default function KidHomepage() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const avatarSize = width * 0.18;
  const containerPadding = width * 0.05;

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={{ paddingTop: height * 0.06 }} className="items-center">
          <Text className="text-3xl font-sans-bold text-txt_blue mb-2">
            Welcome Alyssa
          </Text>
          <Text className="text-base font-sans-regular text-gray-700">
            Ready to read and learn today?
          </Text>
        </View>

        {/* Profile Card */}
        <View
          style={{
            marginHorizontal: containerPadding,
            marginTop: height * 0.04,
            padding: containerPadding,
          }}
          className="bg-white shadow-lg rounded-2xl flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <Image
              source={require("../../../../assets/images/child_avatar2.png")}
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
                marginRight: containerPadding,
                resizeMode: "cover",
              }}
            />
            <View>
              <Text className="text-lg font-sans-semibold text-gray-800">
                Alyssa
              </Text>
              <Text className="text-sm font-sans-regular text-gray-500">
                Grade 3
              </Text>
            </View>
          </View>

          {/* Start Reading Button */}
          <TouchableOpacity
            onPress={() => {
              router.push("/parent/kid/read");
            }}
            className="bg-secondary px-4 py-2 rounded-full"
          >
            <Text className="text-white text-sm font-sans-semibold">
              Start Reading
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tip / Word of the Day Section */}
        <TipWordToggle />

        {/* Reading Progress Section */}
        <View
          style={{
            marginHorizontal: containerPadding,
            marginTop: height * 0.03,
            padding: containerPadding,
          }}
          className="bg-primary rounded-2xl"
        >
          <Text className="font-sans-semibold text-white text-lg mb-2 font-semibold">
            Reading Progress
          </Text>
          <View className="bg-white rounded-xl p-3">
            <Text className="font-sans-medium text-base text-gray-800">
              ⭐ Current Level: Beginner
            </Text>
            <Text className="font-sans-medium text-base text-gray-800 mt-1">
              📚 Last Story: The Crow and The Pitcher
            </Text>
            <Text className="font-sans-medium text-base text-gray-800 mt-1">
              🎯 Accuracy: 92%
            </Text>
          </View>
        </View>

        {/* Badges Collected */}
        <View
          style={{
            marginHorizontal: containerPadding,
            marginTop: height * 0.03,
            padding: containerPadding,
          }}
          className="bg-white shadow-md rounded-2xl"
        >
          <Text className="font-sans-semibold text-txt_blue text-lg mb-4 font-semibold">
            🏅 Badges Collected
          </Text>
          <View className="flex-row justify-between items-center">
            <Image
              source={require("../../../../assets/images/badge1.png")}
              style={{
                width: width * 0.25,
                height: width * 0.25,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../../../../assets/images/badge2.png")}
              style={{
                width: width * 0.25,
                height: width * 0.25,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../../../../assets/images/badge3.png")}
              style={{
                width: width * 0.25,
                height: width * 0.25,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View
          style={{
            marginHorizontal: containerPadding,
            marginTop: height * 0.03,
            padding: containerPadding,
          }}
          className="bg-white shadow-md rounded-2xl"
        >
          <Text className="font-sans-semibold text-txt_blue text-lg mb-4 font-semibold">
            📅 Activity Past 7 Days
          </Text>
          <View className="flex-row justify-around">
            {/* Time Spent */}
            <View className="items-center">
              <Image
                source={require("../../../../assets/images/time_icon.png")}
                style={{
                  width: width * 0.12,
                  height: width * 0.12,
                  resizeMode: "contain",
                }}
              />
              <Text className="text-sm text-gray-700 mt-1">16 min</Text>
            </View>

            {/* Stories Read */}
            <View className="items-center">
              <Image
                source={require("../../../../assets/images/story_icon.png")}
                style={{
                  width: width * 0.12,
                  height: width * 0.12,
                  resizeMode: "contain",
                }}
              />
              <Text className="text-sm text-gray-700 mt-1">2 story</Text>
            </View>
          </View>
        </View>

        {/* Quiz Results Section */}
        <View
          style={{
            marginHorizontal: containerPadding,
            marginTop: height * 0.03,
            padding: containerPadding,
          }}
          className="bg-white shadow-md rounded-2xl"
        >
          <Text className="font-sans-semibold text-txt_blue text-lg mb-4 font-semibold">
            📝 Quiz Results
          </Text>
          <Text className="font-sans-medium text-base text-gray-800 mb-2">
            Quiz: Belling the Cat
          </Text>

          {/* Progress Bar */}
          <View className="bg-gray-200 rounded-full h-4 w-full">
            <View
              className="bg-primary h-4 rounded-full"
              style={{ width: "86%" }}
            />
          </View>

          <Text className="text-sm text-gray-600 mt-1 text-right font-sans-regular">
            86%
          </Text>
          <Text className="text-base font-sans-medium text-gray-800 mb-2">
            Quiz: The Crow and The Pitcher
          </Text>

          {/* Progress Bar */}
          <View className="bg-gray-200 rounded-full h-4 w-full">
            <View
              className="bg-primary h-4 rounded-full"
              style={{ width: "97%" }}
            />
          </View>

          <Text className="text-sm text-gray-600 mt-1 text-right font-sans-regular">
            97%
          </Text>
        </View>

        {/* Footer Spacer */}
        <View style={{ height: height * 0.05 }} />
      </ScrollView>
    </ImageBackground>
  );
}
