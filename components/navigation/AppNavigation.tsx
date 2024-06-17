import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import PostsScreen from "@/app/(screens)/posts";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer independent>
      <Drawer.Navigator
        initialRouteName="(screens)/posts"
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.colors.background,
          },
          drawerInactiveBackgroundColor: theme.colors.primary,
          drawerActiveTintColor: theme.colors.primary,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
        }}
      >
        <Drawer.Screen
          name="(screens)/posts"
          component={PostsScreen}
          options={{
            title: "posts",
            headerTitle: "ProFinder",
            // TODO: Create an component with a logo for this (use header:)
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
