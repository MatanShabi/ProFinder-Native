import { FC, useEffect } from "react";

import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import { FormProvider, useForm } from "react-hook-form";
import useSignUp from "@/hooks/useSignUp";

type SignUpScreenProps = {
  navigation: StackNavigationProp<HomePageStackParamList>;
};

type SingUpForm = {
  email: string;
  password: string;
};

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const methods = useForm<SingUpForm>();
  const { createUser, isLoading, isError, userCradentials } = useSignUp();

  useEffect(() => {
    if (!isLoading && userCradentials?.user) {
      navigation.navigate("Login" as any)
    }
  }, [userCradentials, isLoading])

  return (
    <FormProvider {...methods}>
      <ThemedView>
        <Header />
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.containerHeader}>
            Sign Up
          </Text>
          <FormInput
            label="Email"
            formKey={"email"}
            placeholder="User Email"
            rules={{ required: "Email is required" }}
          />
          <FormInput
            label="Password"
            formKey={"password"}
            placeholder="User Password"
            rules={{ required: "Password is required" }}
          />
          <FormInput
            label="Re-Password"
            formKey={"re-password"}
            placeholder="Revalidate Password"
            rules={{ required: "Re-password is required" }}
          />
          <NavigationLink
            onPress={() => navigation.navigate("Login" as any)}
            text="Already have an account?"
            linkText="Login"
          />
          <Button
            style={{ marginTop: 15 }}
            icon="send"
            mode="contained"
            onPress={methods.handleSubmit(async (data: SingUpForm) =>
              createUser(data.email, data.password)
            )}
          >
            SingUp
          </Button>
        </View>
      </ThemedView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", gap: 15, margin: 20, marginTop: 40 },
  containerHeader: { fontWeight: 700, marginBottom: 10 },
});

export default SignUpScreen;
