import { FC } from "react";

import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";

type SignUpScreenProps = {
  navigation: StackNavigationProp<HomePageStackParamList>;
};

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  return (
    <ThemedView>
      <Header />
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.containerHeader}>
          Sign Up
        </Text>
        <FormInput label="Username" placeholder="Your Unique Username" />
        <FormInput label="Email" placeholder="User Email" />
        <FormInput label="Password" placeholder="User Password" />
        <FormInput label="Re-Password" placeholder="Revalidate Password" />
        <NavigationLink
          onPress={() => navigation.navigate("Login" as any)}
          text="Already have an account?"
          linkText="Login"
        />
        <Button style={{ marginTop: 15 }} icon="send" mode="contained">
          SingUp
        </Button>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", gap: 15, margin: 20, marginTop: 40 },
  containerHeader: { fontWeight: 700, marginBottom: 10 },
});

export default SignUpScreen;
