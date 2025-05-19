import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // Choose icon based on route name
          if (route.name === "home_teacher") {
            iconName = "home";
          } else if (route.name === "class") {
            iconName = "school";
          } else if (route.name === "books") {
            iconName = "book";
          } else if (route.name === "profile") {
            iconName = "person";
          } else {
            iconName = "home";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6E61", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
        headerShown: false, // Hide header for tab screens
      })}
    >
      {/* Tab Screens */}
      <Tabs.Screen name="home_teacher" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="class" options={{ tabBarLabel: "Class" }} />
      <Tabs.Screen name="books" options={{ tabBarLabel: "Books" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
