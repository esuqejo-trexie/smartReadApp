import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";

export default function ReadPage() {
  const { width, height } = useWindowDimensions();
  const [favorites, setFavorites] = useState({});
  const router = useRouter();
  const stories = [
    {
      id: "1",
      title: "The Pitcher and The Crow",
      image: require("../../../../assets/images/story/coverpage.png"),
    },
    {
      id: "2",
      title: "The Lion and The Mouse",
      image: require("../../../../assets/images/story/coverpage2.png"),
    },
    {
      id: "3",
      title: "The Tortoise and The Hare",
      image: require("../../../../assets/images/story/coverpage3.png"),
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStoryPress = (title) => {
    if (title === "The Pitcher and The Crow") {
      router.push("/parent/kid/read/crow");
    } else {
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      <View className="flex-1 items-center pt-20">
        <Text className="text-4xl font-sans-bold text-txt_blue text-center mb-6 px-4">
          Let’s Read a Story! 📚
        </Text>
        <Text className="font-sans-medium text-xl text-secondary text-center mb-10 px-4">
          Swipe to choose your next adventure.
        </Text>

        <Carousel
          loop
          width={width}
          height={500}
          data={stories}
          scrollAnimationDuration={800}
          renderItem={({ item }) => (
            <View className="relative">
              <Pressable
                onPress={() => handleStoryPress(item.title)}
                className="bg-white mx-6 p-4 rounded-2xl items-center shadow-lg"
                style={{
                  backgroundColor: "#FEF0F2",
                  height: 480,
                }}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                      height: 350,
                      borderRadius: 12,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      marginTop: 20,
                    }}
                    className="mb-4"
                  />
                ) : (
                  <View className="w-full h-72 rounded-xl bg-gray-300 mb-4 justify-center items-center">
                    <Text className="text-gray-600">No Image</Text>
                  </View>
                )}
                <Text className="text-txt_blue text-xl font-sans-semibold text-center">
                  {item.title}
                </Text>
                <Text className="text-gray-500 font-sans-regular mt-1 text-center">
                  Tap to start reading
                </Text>
              </Pressable>

              <Pressable
                onPress={() => toggleFavorite(item.id)}
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 8,
                  elevation: 4,
                }}
              >
                <Icon
                  name={favorites[item.id] ? "heart" : "heart-outline"}
                  size={28}
                  color={favorites[item.id] ? "red" : "#888"}
                />
              </Pressable>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}
