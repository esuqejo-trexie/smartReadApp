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
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Student {
  id: string;
  studentName: string;
  parentName: string;
  contactNumber: string;
  invitationSent: boolean;
  registered: boolean;
  active: boolean;
}

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
  const [students, setStudents] = useState<Student[]>([
    {
      id: "ABC123",
      studentName: "Alyssa Perez",
      parentName: "Mary Perez",
      contactNumber: "09058965583",
      invitationSent: true,
      registered: true,
      active: true,
    },
  ]);
  const [showInvalidInputModal, setShowInvalidInputModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleAddStudents = useCallback((): void => {
    const trimmedInput = inputText.trim();
    if (trimmedInput === "") {
      setShowInvalidInputModal(true);
      return;
    }

    const lines = trimmedInput.split("\n");
    let validInputFound = false;
    const newStudents: Student[] = lines
      .map((line): Student | null => {
        const [studentName, parentName, contactNumber] = line.split(",");
        if (
          !studentName?.trim() ||
          !parentName?.trim() ||
          !contactNumber?.trim()
        ) {
          return null;
        }
        validInputFound = true;
        return {
          id: generateCode(),
          studentName: studentName.trim(),
          parentName: parentName.trim(),
          contactNumber: contactNumber.trim(),
          invitationSent: false,
          registered: false,
          active: false,
        };
      })
      .filter((student): student is Student => student !== null);

    if (!validInputFound) {
      setShowInvalidInputModal(true);
      return;
    }

    setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    setInputText("");
  }, [inputText]);

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

  const openMessageModal = (student: Student) => {
    setSelectedStudent(student);
    setShowMessageModal(true);
  };

  const renderStatusButton = (student: Student) => {
    if (student.active) {
      return (
        <View
          className="bg-green-600 px-3 py-2 rounded-lg items-center justify-center shadow-md"
          style={{ minWidth: 120, height: 40 }}
        >
          <Text className="text-white text-sm font-sans-semibold text-center">
            Active
          </Text>
        </View>
      );
    }
    if (student.registered) {
      return (
        <View
          className="bg-blue-600 px-3 py-2 rounded-lg items-center justify-center shadow-md"
          style={{ minWidth: 120, height: 40 }}
        >
          <Text className="text-white text-xs font-sans-semibold text-center">
            Registered
          </Text>
        </View>
      );
    }
    if (student.invitationSent) {
      return (
        <View
          className="bg-gray-400 px-3 py-2 rounded-lg items-center justify-center shadow-md"
          style={{ minWidth: 120, height: 40 }}
        >
          <Text className="text-white text-xs font-sans-semibold text-center">
            Invitation Sent
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => handleSendInvitation(student.id)}
        className="bg-secondary active:bg-secondary-700 px-3 py-2 rounded-lg items-center justify-center shadow-md"
        style={{ minWidth: 120, height: 40 }}
        activeOpacity={0.7}
      >
        <Text className="text-white text-xs font-sans-semibold text-center">
          Send Invitation
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStudent = ({ item }: { item: Student }): JSX.Element => (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 mx-4 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-3">
          <View className="flex-row items-baseline mb-1 flex-wrap">
            <Text className="text-lg font-sans-semibold text-gray-800 mr-2 leading-tight">
              {item.studentName}
            </Text>
            <Text className="text-sm text-blue-600 font-sans-medium leading-tight">
              ({item.id})
            </Text>
          </View>
          <TouchableOpacity onPress={() => openMessageModal(item)}>
            <Text className="text-sm text-secondary font-sans-semibold underline">
              Parent: {item.parentName}
            </Text>
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">
            Contact: {item.contactNumber}
          </Text>
        </View>
        {renderStatusButton(item)}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ width, height }}
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-white/90" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView edges={["bottom", "left", "right"]} className="flex-1">
          <View className="flex-row justify-end items-center px-4 pt-4">
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

          <View className="px-4 mt-6 mb-3">
            <Text className="text-3xl font-sans-bold text-txt_blue text-center">
              Class Management
            </Text>
          </View>

          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderStudent}
            ListHeaderComponent={
              <>
                <View className="bg-white/95 rounded-2xl p-4 mx-4 my-3 shadow-lg">
                  <Text className="text-base font-sans-regular text-gray-700 mb-1">
                    Please provide student information in the format:
                  </Text>
                  <Text className="text-sm font-sans-regular text-gray-500 mb-3">
                    Student Name,Parent Name,Contact Number{"\n"}(one student
                    per line)
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 font-sans-regular text-base text-gray-800 h-32"
                    placeholder={
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
                      Add Students
                    </Text>
                  </TouchableOpacity>
                </View>
                {students.length > 0 && (
                  <View className="px-4">
                    <Text className="text-xl font-sans-semibold text-gray-700 mb-3">
                      Students
                    </Text>
                  </View>
                )}
              </>
            }
            ListEmptyComponent={
              <View className="items-center mt-10 px-4">
                <Text className="text-lg text-gray-600 text-center mb-2">
                  No students added yet.
                </Text>
                <Text className="text-sm text-gray-500 text-center">
                  Use the form above to add students.
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Message Modal for Specific Parent */}
      <Modal
        transparent
        animationType="fade"
        visible={showMessageModal}
        onRequestClose={() => setShowMessageModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl pt-6 pb-8 h-3/4 max-h-[90vh]">
            <View className="px-6 pb-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-2xl font-sans-bold text-primary">
                  Message
                </Text>
                <TouchableOpacity
                  onPress={() => setShowMessageModal(false)}
                  className="p-2"
                >
                  <Text className="text-gray-500 text-lg">✕</Text>
                </TouchableOpacity>
              </View>
              {selectedStudent && (
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/teach_avatar2.png")}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <View>
                    <Text className="text-lg font-sans-semibold text-gray-800">
                      {selectedStudent.parentName}
                    </Text>
                    <Text className="text-sm font-sans-regular text-gray-500">
                      Parent of {selectedStudent.studentName}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <ScrollView
              className="flex-1 px-6 pt-4"
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <Text className="text-base text-gray-600">
                Start a conversation with {selectedStudent?.parentName}.
              </Text>
              {/* You can map messages here */}
            </ScrollView>

            <View className="px-6 pt-3 border-t border-gray-200">
              <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
                <TextInput
                  placeholder="Type a message..."
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 font-sans-regular text-gray-800 text-base"
                />
                <TouchableOpacity className="ml-2 p-2">
                  <Text className="text-primary text-lg">➤</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
