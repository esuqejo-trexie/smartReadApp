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
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const parentAvatars = [
  require("../../../assets/images/parent_avatar1.png"),
  require("../../../assets/images/parent_avatar2.png"),
  require("../../../assets/images/parent_avatar3.png"),
];

export default function ProfileScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [nickname, setNickname] = useState("Mrs. Mary");
  const [phoneNumber, setPhoneNumber] = useState("+63912345678");

  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);
  const [tempAvatarIndex, setTempAvatarIndex] = useState(selectedAvatarIndex);

  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const onEditPress = () => {
    setTempNickname(nickname);
    setTempAvatarIndex(selectedAvatarIndex);
    setTempPhoneNumber(phoneNumber);
    setIsEditing(true);
  };

  const onSavePress = () => {
    setNickname(tempNickname.trim() || nickname);
    setSelectedAvatarIndex(tempAvatarIndex);
    setPhoneNumber(tempPhoneNumber.trim() || phoneNumber);
    setIsEditing(false);
  };

  const onCancelPress = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          router.push("/signup");
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-white/90" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-4 py-8 space-y-6">

            <View className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-purple-100">
              {/* Header */}
              <View className="flex-row items-center mb-4">
                <View className="relative">
                  <Image
                    source={
                      parentAvatars[
                        isEditing ? tempAvatarIndex : selectedAvatarIndex
                      ]
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
                    <>
                      <TextInput
                        value={tempNickname}
                        onChangeText={setTempNickname}
                        className="text-xl font-sans-bold text-indigo-600 border-b border-dashed border-purple-300 pb-1 mb-2"
                        placeholder="Your name..."
                        placeholderTextColor="#a78bfa"
                        maxLength={30}
                        selectionColor="#8b5cf6"
                      />
                      <TextInput
                        value={tempPhoneNumber}
                        onChangeText={setTempPhoneNumber}
                        className="text-base font-sans-regular text-gray-700 border-b border-dashed border-purple-200 pb-1"
                        placeholder="Your phone number..."
                                                placeholderTextColor="#c4b5fd"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                      />
                    </>
                  ) : (
                    <>
                      <Text className="text-2xl font-sans-bold text-purple-500">
                        {nickname}
                      </Text>
                      <Text className="text-sm font-sans-regular text-gray-600 mt-1">
                        {phoneNumber}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              <View className="flex-row justify-end mt-2 mb-6">
                {isEditing ? (
                  <View className="flex-row space-x-3">
                    <Pressable
                      onPress={onCancelPress}
                      className="bg-white px-5 py-2 rounded-full border-2 border-gray-300 active:bg-gray-100 shadow-sm"
                    >
                      <Text className="text-gray-600 font-sans-bold">
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={onSavePress}
                      className="bg-secondary px-5 py-2 rounded-full active:opacity-90 shadow-md"
                    >
                      <Text className="text-white font-sans-bold">Save</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={onEditPress}
                    className="bg-secondary px-6 py-2 rounded-full active:opacity-90 shadow-md"
                  >
                    <Text className="text-white font-sans-bold">
                      Edit Profile
                    </Text>
                  </Pressable>
                )}
              </View>

              {isEditing && (
                <View>
                  <Text className="text-center text-purple-600 font-sans-bold mb-4 text-lg">
                    Pick your avatar!
                  </Text>
                  <View className="flex-row justify-center space-x-4">
                    {parentAvatars.map((avatar, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => setTempAvatarIndex(idx)}
                        className={`rounded-full p-1 ${
                          tempAvatarIndex === idx
                            ? "bg-secondary scale-110"
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

            <View className="bg-white w-full max-w-md rounded-2xl shadow-md border border-purple-200 mt-5">
              <Pressable
                onPress={() => setShowSettings(!showSettings)}
                className="px-6 py-4 flex-row justify-between items-center"
              >
                <Text className="text-lg font-sans-bold text-purple-700">
                  Settings
                </Text>
                <Text className="text-purple-500 text-xl">
                  {showSettings ? "▴" : "▾"}
                </Text>
              </Pressable>
              {showSettings && (
                <View className="px-6 pb-4">
                  <Text className="font-sans-regular text-gray-600">
                    Notifications
                  </Text>

                </View>
              )}
            </View>

            <View className="bg-white w-full max-w-md rounded-2xl shadow-md border border-purple-200 mt-5">
              <Pressable
                onPress={() => setShowSupport(!showSupport)}
                className="px-6 py-4 flex-row justify-between items-center"
              >
                <Text className="text-lg font-sans-bold text-purple-700">
                  Help & Support
                </Text>
                <Text className="text-purple-500 text-xl">
                  {showSupport ? "▴" : "▾"}
                </Text>
              </Pressable>
              {showSupport && (
                <View className="px-6 pb-4">
                  <Text className="font-sans-regular text-gray-600">FAQ</Text>
                  <Text className="font-sans-regular text-gray-600 mt-1">
                    Contact Support
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              onPress={handleLogout}
              className="bg-red-100 border border-red-300 px-6 py-3 rounded-full mt-2 active:bg-red-200 w-full max-w-md mt-5"
            >
              <Text className="text-red-600 font-sans-bold text-center">
                Log Out
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
