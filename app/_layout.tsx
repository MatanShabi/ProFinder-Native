import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { theme } from "@/constants/theme";
import { PaperProvider } from "react-native-paper";
import DrawerNavigation from "@/components/navigation/DrawerNavigation";
import HomePageNavigation from "@/components/navigation/HomePageNavigation";
import useUser from "@/hooks/useUser";

export default function RootLayout() {
  const { user } = useUser();
  return (
    <PaperProvider theme={theme}>
      {user ? <DrawerNavigation /> : <HomePageNavigation />}
    </PaperProvider>
  );
}
