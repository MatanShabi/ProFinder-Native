import React, { FC, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { FormProvider, useForm } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import useSignUp from "@/hooks/useSignUp";

type SignUpScreenProps = {
  navigation: StackNavigationProp<HomePageStackParamList>;
};

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const methods = useForm<SignUpForm>();
  const { createUser, isLoading, userCredentials } = useSignUp();

  useEffect(() => {
    if (!isLoading && userCredentials?.user) {
      navigation.navigate("Login" as any);
    }
  }, [userCredentials, isLoading]);

  return (
    <FormProvider {...methods}>
      <ThemedView>
        <Header />
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.containerHeader}>
            Sign Up
          </Text>
          <FormInput
            label="First Name"
            formKey="firstName"
            placeholder="First Name"
            rules={{ required: "First name is required" }}
          />
          <FormInput
            label="Last Name"
            formKey="lastName"
            placeholder="Last Name"
            rules={{ required: "Last name is required" }}
          />
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
            secureTextEntry={true}
            rules={{ required: "Password is required" }}
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
            onPress={methods.handleSubmit(async (data: SignUpForm) =>
              createUser(
                data.email,
                data.password,
                data.firstName,
                data.lastName,
              ),
            )}
          >
            Sign Up
          </Button>
          {isLoading && (
            <Modal transparent={false} animationType="none">
              <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} size={120} />
              </View>
            </Modal>
          )}
        </View>
      </ThemedView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 15,
    margin: 20,
    marginTop: 40,
  },
  containerHeader: {
    fontWeight: "700",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
