import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const avatars = [
  require("../../../../assets/images/child_avatar1.png"),
  require("../../../../assets/images/child_avatar2.png"),
  require("../../../../assets/images/child_avatar3.png"),
];

export default function KidProfile() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(1);
  const [nickname, setNickname] = useState("Alyssa");
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempAvatarIndex, setTempAvatarIndex] = useState(selectedAvatarIndex);
  const [activeTab, setActiveTab] = useState<"Last week" | "This week">(
    "Last week"
  );

  const onEditPress = () => {
    setTempNickname(nickname);
    setTempAvatarIndex(selectedAvatarIndex);
    setIsEditing(true);
  };

  const onSavePress = () => {
    setNickname(tempNickname.trim() || nickname);
    setSelectedAvatarIndex(tempAvatarIndex);
    setIsEditing(false);
  };

  const onCancelPress = () => {
    setIsEditing(false);
  };

  const activityData = {
    "Last week": {
      storiesCompleted: 12,
      gamesStatus: "Completed 5 games",
      quizzes: 4,
    },
    "This week": {
      storiesCompleted: 3,
      gamesStatus: "Completed 1 game",
      quizzes: 1,
    },
  };

  const stats = activityData[activeTab];

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white/85" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-4 py-8">
            <View className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-blue-500/20 border-2 border-purple-100">
              {/* Profile Header */}
              <View className="flex-row items-center mb-2">
                <View className="relative">
                  <Image
                    source={
                      avatars[isEditing ? tempAvatarIndex : selectedAvatarIndex]
                    }
                    className="w-24 h-24 rounded-full border-4 border-pink-300"
                    resizeMode="cover"
                  />
                  {isEditing && (
                    <View className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-white">
                      <Text className="text-xs font-sans-bold text-white">
                        ✨
                      </Text>
                    </View>
                  )}
                </View>

                <View className="ml-4 flex-1">
                  {isEditing ? (
                    <TextInput
                      value={tempNickname}
                      onChangeText={setTempNickname}
                      className="text-3xl font-sans-bold text-indigo-600 border-b-2 border-dashed border-purple-300 pb-1 flex-1"
                      placeholder="Your name..."
                      placeholderTextColor="#a78bfa"
                      maxLength={20}
                      autoFocus
                      selectionColor="#8b5cf6"
                    />
                  ) : (
                    <Text className="text-3xl font-sans-bold text-purple-700">
                      {nickname}
                    </Text>
                  )}
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-end mt-2 mb-4">
                {isEditing ? (
                  <View className="flex-row space-x-3">
                    <Pressable
                      onPress={onCancelPress}
                      className="bg-white px-5 py-2 rounded-full border-2 border-gray-300 active:bg-gray-100 shadow-sm"
                      accessibilityLabel="Cancel changes"
                    >
                      <Text className="text-gray-600 font-sans-bold">
                        Oops!
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={onSavePress}
                      className="bg-secondary px-5 py-2 rounded-full active:opacity-90 shadow-md"
                      accessibilityLabel="Save changes"
                    >
                      <Text className="text-white font-sans-bold">Yay!</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={onEditPress}
                    className="bg-secondary px-6 py-2 rounded-full active:opacity-90 shadow-md"
                    accessibilityLabel="Edit profile"
                  >
                    <Text className="text-white font-sans-bold">Edit Me!</Text>
                  </Pressable>
                )}
              </View>

              {/* Avatar Picker */}
              {isEditing && (
                <View className="mt-6">
                  <Text className="text-center text-purple-600 font-sans-bold mb-4 text-lg">
                    Pick your avatar!
                  </Text>
                  <View className="flex-row justify-center space-x-4">
                    {avatars.map((avatar, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => setTempAvatarIndex(idx)}
                        className={`rounded-full p-1 ${
                          tempAvatarIndex === idx
                            ? "bg-secondary transform scale-110"
                            : "border-2 border-transparent"
                        } active:scale-95 transition-all`}
                      >
                        <View className="relative">
                          <Image
                            source={avatar}
                            className="w-16 h-16 rounded-full"
                            resizeMode="cover"
                          />
                          {tempAvatarIndex === idx && (
                            <View className="absolute -top-1 -right-1 bg-green-400 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                              <Text className="text-white text-xs">✓</Text>
                            </View>
                          )}
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Activity Section */}
            {!isEditing && (
              <View className="w-full max-w-md mt-6">
                {/* Tabs */}
                <View className="flex-row justify-center bg-secondary rounded-full p-1 mb-4">
                  {["Last week", "This week"].map((tab) => (
                    <Pressable
                      key={tab}
                      onPress={() =>
                        setActiveTab(tab as "Last week" | "This week")
                      }
                      className={`flex-1 py-2 rounded-full ${
                        activeTab === tab ? "bg-white" : "bg-secondary"
                      }`}
                    >
                      <Text
                        className={`text-center font-sans-bold ${
                          activeTab === tab ? "text-secondary" : "text-white"
                        }`}
                      >
                        {tab}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* Cards */}
                <View className="space-y-4">
                  <View className="rounded-xl border border-purple-200 bg-white p-4 shadow mb-5">
                    <Text className="mb-1 text-lg font-sans-bold text-purple-700">
                      Stories Completed
                    </Text>
                    <Text className="font-sans-regular text-gray-700">
                      {stats.storiesCompleted} stories
                    </Text>
                  </View>

                  <View className="rounded-xl border border-blue-200 bg-white p-4 shadow mb-5">
                    <Text className="mb-1 text-lg font-sans-bold text-blue-700">
                      Games Status
                    </Text>
                    <Text className="font-sans-regular text-gray-700">
                      {stats.gamesStatus}
                    </Text>
                  </View>

                  <View className="rounded-xl border border-yellow-200 bg-white p-4 shadow">
                    <Text className="mb-1 text-lg font-sans-bold text-yellow-700">
                      Quizzes
                    </Text>
                    <Text className="font-sans-regular text-gray-700">
                      {stats.quizzes} quizzes
                    </Text>
                  </View>
                </View>

                {/* ✅ I'm Done Button */}
                <Pressable
                  onPress={() => router.push("/parent/(tabs)/my_child")}
                  className="mt-6 bg-primary px-6 py-3 rounded-full active:opacity-90 shadow-lg"
                  accessibilityLabel="Done with profile"
                >
                  <Text className="text-white text-center font-sans-bold text-lg">
                    I'm Done
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
