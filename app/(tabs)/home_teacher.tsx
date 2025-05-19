import React from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function HomeTeacher() {
  const { width, height } = useWindowDimensions();
  const containerPadding = width * 0.05;
  const avatarSize = width * 0.18;

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
      resizeMode="cover"
    >
      {/* White overlay */}
      <View className="absolute inset-0 bg-white opacity-90" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header: Avatar and User Info */}
        <View
          style={{
            paddingTop: height * 0.06,
            paddingHorizontal: containerPadding,
          }}
          className="flex-row justify-end items-center"
        >
          <View className="mr-3 items-end">
            <Text className="text-base font-sans-semibold text-secondary">
              Ms. Carla
            </Text>
            <Text className="text-sm font-sans-regular text-gray-600">
              Teacher
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              borderWidth: 2,
              borderColor: "#3B82F6", // Assuming primary is blue-500
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../../assets/images/teach_avatar2.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <Text
          className="text-center text-txt_blue font-sans-bold"
          style={{
            fontSize: 28,
            marginTop: height * 0.05,
            marginBottom: height * 0.03,
          }}
        >
          Welcome Teacher Carla!
        </Text>

        {/* Quick Stats */}
        <View
          style={{ paddingHorizontal: containerPadding }}
          className="flex-row justify-between mb-10"
        >
          {[
            { label: "Students", value: 25 },
            { label: "Active Sessions", value: 12 },
          ].map(({ label, value }) => (
            <View
              key={label}
              className="bg-white rounded-2xl shadow-md items-center"
              style={{ padding: containerPadding, width: width * 0.4 }}
            >
              <Text className="text-primary font-bold" style={{ fontSize: 24 }}>
                {value}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">{label}</Text>
            </View>
          ))}
        </View>

        {/* Student Activities */}
        <View
          style={{ paddingHorizontal: containerPadding }}
          className="bg-white rounded-2xl shadow-md p-5 mb-8 mx-5"
        >
          <Text className="text-primary font-sans-semibold text-lg mb-3">
            Student Activities
          </Text>
          <Text className="text-gray-700 text-base">
            • Alyssa completed reading the story{" "}
            <Text className="font-sans-semibold">
              "The Pitcher and The Crow"
            </Text>
          </Text>
        </View>

        {/* Messages */}
        <View
          style={{ paddingHorizontal: containerPadding }}
          className="bg-white rounded-2xl shadow-md p-5 mb-12 mx-5"
        >
          <Text className="text-primary font-sans-semibold text-lg mb-3">
            Messages
          </Text>
          <Text className="text-gray-700 text-base">
            • Mary sent you 2 messages
          </Text>
        </View>

        {/* Footer Spacer */}
        <View style={{ height: height * 0.05 }} />
      </ScrollView>
    </ImageBackground>
  );
}
