import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // Choose icon based on route name
          if (route.name === "home_parent") {
            iconName = "home";
          } else if (route.name === "my_child") {
            iconName = "people";
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
      {/* Tab Screens for Parent */}
      <Tabs.Screen name="home_parent" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="my_child" options={{ tabBarLabel: "My Child" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
