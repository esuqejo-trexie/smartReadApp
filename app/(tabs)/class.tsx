import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
  Modal,
  Alert, // Keep Alert for now, or replace with your preferred notification
} from "react-native";
import React, { useState, useCallback } from "react"; // Added useCallback
import { SafeAreaView } from "react-native-safe-area-context";

// Define the structure for a student object
interface Student {
  id: string; // Unique code for the student
  studentName: string;
  parentName: string;
  contactNumber: string;
  invitationSent: boolean; // To track if an invitation has been sent
}

// Function to generate a unique 6-character alphanumeric code
const generateCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};

export default function ClassScreen(): JSX.Element {
  const { width, height } = useWindowDimensions();
  const [inputText, setInputText] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [showInvalidInputModal, setShowInvalidInputModal] = useState(false);

  // Handles adding new students from the input text
  const handleAddStudents = useCallback((): void => {
    const trimmedInput = inputText.trim();

    // Show modal if input is empty
    if (trimmedInput === "") {
      setShowInvalidInputModal(true);
      return;
    }

    const lines = trimmedInput.split("\n");
    let validInputFound = false;
    const newStudents: Student[] = lines
      .map((line): Student | null => {
        const [studentName, parentName, contactNumber] = line.split(",");

        // Validate if all parts are present and not just whitespace
        if (
          !studentName?.trim() ||
          !parentName?.trim() ||
          !contactNumber?.trim()
        ) {
          return null; // Invalid line
        }
        validInputFound = true;
        return {
          id: generateCode(),
          studentName: studentName.trim(),
          parentName: parentName.trim(),
          contactNumber: contactNumber.trim(),
          invitationSent: false,
        };
      })
      .filter((student): student is Student => student !== null);

    // Show modal if input was provided but no valid students were parsed
    if (!validInputFound) {
      setShowInvalidInputModal(true);
      return; // Return here to prevent clearing input if no valid students were added
    }

    // Add valid students to the list and clear input
    if (newStudents.length > 0) {
      setStudents((prevStudents) => [...prevStudents, ...newStudents]);
      setInputText(""); // Clear input only if students were successfully added
    }
  }, [inputText]);

  // Handles sending an invitation to a student
  const handleSendInvitation = useCallback((studentId: string): void => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId && !student.invitationSent) {
          Alert.alert(
            "Invitation Sent",
            `Invitation has been marked as sent to ${student.studentName} (Code: ${student.id}).\nParent Contact: ${student.contactNumber}`
          );
          return { ...student, invitationSent: true };
        }
        return student;
      })
    );
  }, []);

  // Renders each student item in the list
  const renderStudent = ({ item }: { item: Student }): JSX.Element => (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-3">
          <View className="flex-row items-baseline mb-1 flex-wrap">
            <Text className="text-lg font-semibold text-gray-800 mr-2 leading-tight">
              {item.studentName}
            </Text>
            <Text className="text-sm text-blue-600 font-medium leading-tight">
              {"("}
              {item.id}
              {")"}
            </Text>
          </View>
          <Text className="text-sm text-gray-600 mb-1">
            {"Parent: "}
            {item.parentName}
          </Text>
          <Text className="text-sm text-gray-600">
            {"Contact: "}
            {item.contactNumber}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSendInvitation(item.id)}
          className={`
            ${
              item.invitationSent
                ? "bg-gray-400" // Disabled color
                : "bg-secondary active:bg-secondary-700" // Active color from your snippet
            }
            px-3 py-2 rounded-lg items-center justify-center shadow-md
          `}
          style={{ minWidth: 120, height: 40 }}
          activeOpacity={item.invitationSent ? 1 : 0.7} // No opacity change if disabled
          disabled={item.invitationSent}
        >
          <Text className="text-white text-xs font-semibold text-center">
            {item.invitationSent ? "Invitation Sent" : "Send Invitation"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")} // Ensure this path is correct
      style={{ width, height }}
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-white/90" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView edges={["bottom", "left", "right"]} className="flex-1">
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderStudent}
            ListHeaderComponent={
              <View className="px-5 pt-8 pb-4 md:pt-10">
                <Text className="text-3xl font-sans-bold text-center mt-10 mb-6 text-txt_blue">
                  {"Class Management"}
                </Text>
                <View className="bg-white/95 rounded-2xl p-5 mb-6 shadow-lg">
                  <Text className="text-base font-sans-regular text-gray-700 mb-1">
                    {"Please provide student information in the format:"}
                  </Text>
                  <Text className="text-sm font-sans-regular text-gray-500 mb-3">
                    {"Student Name,Parent Name,Contact Number"}
                    {"\n"}
                    {"(one student per line)"}
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 font-sans-regular text-base text-gray-800 h-32"
                    placeholder={
                      // Updated placeholder
                      "Alex Lee,Maria Lee,09123456789\nJohn Smith,Peter Smith,09876543210"
                    }
                    placeholderTextColor="#999"
                    multiline
                    value={inputText}
                    onChangeText={setInputText}
                    textAlignVertical="top"
                    scrollEnabled
                    autoCapitalize="words"
                  />
                  <TouchableOpacity
                    onPress={handleAddStudents}
                    className="bg-primary rounded-xl py-4 items-center mt-4 shadow-md active:opacity-80"
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-base font-sans-bold tracking-wide">
                      {"Add Students"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {students.length > 0 && (
                  <Text className="text-xl font-sans-semibold text-gray-700 mb-3 px-1">
                    {"Students"}
                  </Text>
                )}
              </View>
            }
            ListEmptyComponent={
              <View className="items-center mt-10 px-5">
                <Text className="text-lg text-gray-600 text-center mb-2">
                  {"No students added yet."}
                </Text>
                <Text className="text-sm text-gray-500 text-center">
                  {"Use the form above to add students."} {/* Updated text */}
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Modal for Invalid Input - Updated Structure and Content */}
      <Modal
        transparent
        animationType="fade"
        visible={showInvalidInputModal}
        onRequestClose={() => setShowInvalidInputModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-5">
          {/* Modal Content as per your provided structure */}
          <View
            className="bg-white p-6 rounded-2xl w-4/5 items-center shadow-lg"
            style={{ maxWidth: width * 0.9 }} // Responsive modal width
          >
            <Text className="text-2xl sm:text-3xl lg:text-4xl font-sans-bold text-secondary mb-4">
              {"Ooops!"}
            </Text>
            <Text className="text-center text-base sm:text-lg lg:text-xl font-sans-medium text-gray-700 mb-6">
              {
                "Please ensure each student entry includes a Student Name, Parent Name, and Contact Number, separated by commas. Input cannot be empty."
              }
              {"\n\n"}
              {"Example: Alex Lee,Maria Lee,09123456789"}
            </Text>
            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-full shadow-md active:opacity-80" // Updated button style
              onPress={() => setShowInvalidInputModal(false)}
              activeOpacity={0.8}
            >
              <Text className="text-white text-xl font-sans-semibold">
                {"OKAY"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
