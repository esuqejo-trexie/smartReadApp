import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";

export default function ReadPage() {
  const { width, height } = useWindowDimensions();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const router = useRouter();

  const tags = [
    "All",
    "Favorites",
    "1st Quarter",
    "2nd Quarter",
    "3rd Quarter",
    "4th Quarter",
  ];

  const stories = [
    {
      id: "1",
      title: "The Pitcher and The Crow",
      image: require("../../../../assets/images/story/coverpage.png"),
      quarter: "1st Quarter",
    },
    {
      id: "2",
      title: "The Lion and The Mouse",
      image: require("../../../../assets/images/story/coverpage2.png"),
      quarter: "1st Quarter",
    },
    {
      id: "3",
      title: "The Tortoise and The Hare",
      image: require("../../../../assets/images/story/coverpage3.png"),
      quarter: "1st Quarter",
    },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStoryPress = (title: string) => {
    if (title === "The Pitcher and The Crow") {
      router.push("/parent/kid/read/crow");
    }
  };

  const filteredStories = stories.filter((story) => {
    if (selectedTag === "All") return true;
    if (selectedTag === "Favorites") return favorites[story.id];
    return story.quarter === selectedTag;
  });

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      <View className="flex-1 items-center pt-20">
        <Text className="text-4xl font-sans-bold text-txt_blue text-center mb-4 px-4">
          Let’s Read a Story! 📚
        </Text>
        <Text className="font-sans-medium text-xl text-secondary text-center px-4">
          Swipe to choose your next adventure.
        </Text>

        {/* TAG FILTER BAR */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {tags.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full ${
                selectedTag === tag ? "bg-secondary" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-sans-medium ${
                  selectedTag === tag ? "text-white" : "text-gray-800"
                }`}
              >
                {tag}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* STORY CAROUSEL OR FALLBACK */}
        {filteredStories.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10 px-4">
            <Text className="text-lg text-gray-500 font-sans-medium text-center">
              No stories available yet.
            </Text>
          </View>
        ) : (
          <Carousel
            loop
            width={width}
            height={500}
            data={filteredStories}
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
        )}
      </View>
    </ImageBackground>
  );
}
