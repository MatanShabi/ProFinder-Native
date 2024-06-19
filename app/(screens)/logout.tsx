import React, { useEffect } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation"; // Adjust path as needed
import { getAuth, signOut } from "firebase/auth";
import { ThemedView } from "@/components/ThemedView";


type LogoutScreenNavigationProp = StackNavigationProp<HomePageStackParamList>;

const LogoutScreen = () => {
  const navigation = useNavigation<LogoutScreenNavigationProp>();

  const showAlert = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => navigation.navigate("Posts" as any), // Navigate to Posts if cancelled
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const auth = getAuth();
            try {
              await signOut(auth);
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // Show alert every time the component is mounted or navigated to
    const unsubscribe = navigation.addListener("focus", () => {
      showAlert();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ThemedView>
    </ThemedView>
  );
};


export default LogoutScreen;
