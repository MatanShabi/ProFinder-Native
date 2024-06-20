import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import PostsScreen from "@/app/(screens)/posts";
import LogoutScreen from "@/app/(screens)/logout";
import ProfileScreen from "@/app/(screens)/profile";
import AboutUsScreen from "@/app/(screens)/aboutus";
import PrivacyPolicyScreen from "@/app/(screens)/privacypolicy";
import useUser from "@/hooks/useUser";
import { Avatar, Drawer as PaperDrawer, Text } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const theme = useTheme();
  const { user } = useUser();

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
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            <PaperDrawer.Section>
              <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
                <View style={styles.avatarContainer}>
                  <Avatar.Image
                    size={80}
                    source={{
                      uri: user?.photoURL || "https://via.placeholder.com/120",
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.avatarText}>{user?.displayName}</Text>
                </View>
              </TouchableOpacity>
            </PaperDrawer.Section>
            <PaperDrawer.Section>
              <PaperDrawer.Item
                label="Posts"
                icon="file"
                onPress={() => props.navigation.navigate("Posts")}
              />
              <PaperDrawer.Item
                label="Privacy Policy"
                icon="shield"
                onPress={() => props.navigation.navigate("PrivacyPolicy")}
              />
              <PaperDrawer.Item
                label="About Us"
                icon="information"
                onPress={() => props.navigation.navigate("AboutUs")}
              />
              <PaperDrawer.Item
                label="Logout"
                icon="exit-to-app"
                onPress={() => props.navigation.navigate("Logout")}
              />
            </PaperDrawer.Section>
          </View>
        )}
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

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  avatar: {
    marginRight: 10,
    marginTop: 20,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DrawerNavigation;
