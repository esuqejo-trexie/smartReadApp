import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function KidsTabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "kid_homepage") {
            iconName = "home";
          } else if (route.name === "read") {
            iconName = "book";
          } else if (route.name === "mini_games") {
            iconName = "game-controller";
          } else if (route.name === "profile") {
            iconName = "person";
          } else {
            iconName = "home";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6E61",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="kid_homepage" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="read" options={{ tabBarLabel: "Read" }} />
      <Tabs.Screen name="mini_games" options={{ tabBarLabel: "Games" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
