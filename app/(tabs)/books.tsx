import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function BookScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedQuarter, setSelectedQuarter] = useState("1st");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const students = ["Alyssa", "Joshua", "Kath", "Richie", "Mira"];
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const allStories = {
    "1st": [
      {
        id: "1",
        title: "The Pitcher and The Crow",
        image: require("../../assets/images/story/coverpage.png"),
      },
      {
        id: "2",
        title: "The Lion and The Mouse",
        image: require("../../assets/images/story/coverpage2.png"),
      },
      {
        id: "3",
        title: "The Tortoise and The Hare",
        image: require("../../assets/images/story/coverpage3.png"),
      },
    ],
    "2nd": [],
    "3rd": [],
    "4th": [],
  };

  const quarters = ["1st", "2nd", "3rd", "4th"];

  const cardSpacing = 12;
  const cardWidth = (width - 32 - cardSpacing) / 2;
  const cardHeight = (cardWidth * 3) / 2;

  const openStudentModal = (storyTitle: string) => {
    setSelectedStory(storyTitle);
    setShowStudentModal(true);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const toggleStudent = (student: string) => {
    setSelectedStudents((prev) =>
      prev.includes(student)
        ? prev.filter((s) => s !== student)
        : [...prev, student]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents([...students]);
    }
    setSelectAll(!selectAll);
  };

  const handleAssign = () => {
    console.log(`Assigned "${selectedStory}" to:`, selectedStudents);
    setShowStudentModal(false);
  };

  const CustomCheckbox = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <Pressable
      onPress={onChange}
      className={`w-5 h-5 rounded border-2 ${
        checked ? "bg-secondary border-secondary" : "border-gray-400"
      } items-center justify-center`}
    >
      {checked && <Text className="text-white text-xs">✔</Text>}
    </Pressable>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-white opacity-90" />

      <View className="flex-1 px-4">
        {/* Added Avatar here */}
        <View className="flex-row justify-end items-center px-4 pt-4 pb-5 mb-4">
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
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary"
          >
            <Image
              source={require("../../assets/images/teach_avatar2.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <Text className="text-3xl font-sans-bold text-center text-txt_blue mb-4">
          Story Library 📚
        </Text>

        {/* Quarter Selector */}
        <View className="flex-row justify-center flex-wrap gap-2 mb-6">
          {quarters.map((quarter) => (
            <Pressable
              key={quarter}
              onPress={() => setSelectedQuarter(quarter)}
              className={`py-2 px-4 rounded-full ${
                selectedQuarter === quarter ? "bg-secondary" : "bg-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-sans-medium ${
                  selectedQuarter === quarter ? "text-white" : "text-black"
                }`}
              >
                {quarter} Quarter
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Story List */}
        {allStories[selectedQuarter].length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            No stories available for {selectedQuarter} Quarter.
          </Text>
        ) : (
          <FlatList
            data={allStories[selectedQuarter]}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{ width: cardWidth }}
                className="bg-white rounded-2xl overflow-hidden shadow-md"
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                  }}
                />
                <View className="p-3">
                  <Text className="text-base font-sans-semibold text-txt_blue mb-2">
                    {item.title}
                  </Text>
                  <View className="flex-row justify-end">
                    <Pressable
                      onPress={() => openStudentModal(item.title)}
                      className="bg-secondary py-1.5 px-3 rounded-xl"
                    >
                      <Text className="text-white text-sm font-sans-medium">
                        Assign to Students
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Modal for student selection */}
      <Modal
        visible={showStudentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStudentModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl w-full max-w-md p-6">
            <Text className="text-xl font-sans-bold text-center text-txt_blue mb-4">
              Assign to Students
            </Text>

            <ScrollView style={{ maxHeight: 250 }}>
              <View className="flex-row items-center mb-2">
                <CustomCheckbox
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <Text className="ml-2 font-sans-medium">Select All</Text>
              </View>

              {students.map((student) => (
                <View key={student} className="flex-row items-center mb-2 pl-1">
                  <CustomCheckbox
                    checked={selectedStudents.includes(student)}
                    onChange={() => toggleStudent(student)}
                  />
                  <Text className="font-sans-regular ml-2">{student}</Text>
                </View>
              ))}
            </ScrollView>

            <View className="mt-4 flex-row justify-end gap-2">
              <Pressable
                onPress={() => setShowStudentModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                <Text className="text-black font-sans-medium">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAssign}
                className="px-4 py-2 rounded bg-secondary"
              >
                <Text className="text-white font-sans-medium">Assign</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
