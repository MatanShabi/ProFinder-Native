import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import PostsScreen from "@/app/(screens)/posts";
import LogoutScreen from "@/app/(screens)/logout";
import ProfileScreen from "@/app/(screens)/profile";
import AboutUsScreen from "@/app/(screens)/aboutus";
import PrivacyPolicyScreen from "@/app/(screens)/privacypolicy";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer independent>
      <Drawer.Navigator
        initialRouteName="Posts"
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
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Posts",
            headerTitle: "Posts",
          }}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            title: "Privacy Policy",
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{
            title: "About Us",
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            title: "Logout",
          }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
