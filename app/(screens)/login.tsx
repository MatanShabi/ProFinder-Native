import { FC, useState } from "react";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";

type LoginScreenProps = {
  navigation: StackNavigationProp<HomePageStackParamList>;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <ThemedView>
      <Header />
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.containerHeader}>
          Login
        </Text>
        <FormInput
          label="Email"
          placeholder="User Email"
          value={username}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setUsername(e.nativeEvent.text)
          }
        />
        <FormInput
          label="Password"
          placeholder="User Password"
          value={password}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setPassword(e.nativeEvent.text)
          }
        />
        <NavigationLink
          onPress={() => navigation.navigate("Signup" as any)}
          text="Don't have an account?"
          linkText="Sign Up"
        />
        <Button style={{ marginTop: 15 }} icon="login" mode="contained">
          Login
        </Button>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", gap: 15, margin: 20, marginTop: 40 },
  containerHeader: { fontWeight: 700, marginBottom: 10 },
});

export default LoginScreen;
