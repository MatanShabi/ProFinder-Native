import React from "react";
import "react-native-reanimated";
import { theme } from "@/constants/theme";
import { PaperProvider } from "react-native-paper";
import DrawerNavigation from "@/components/navigation/DrawerNavigation";
import HomePageNavigation from "@/components/navigation/HomePageNavigation";
import useUser from "@/hooks/useUser";
import { Provider } from 'react-redux'
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";


export default function RootLayout() {
  const { user } = useUser();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          {user ? <DrawerNavigation /> : <HomePageNavigation />}
        </PaperProvider>
      </PersistGate>
    </Provider>

  );
}
