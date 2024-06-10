import { FC, useEffect } from "react";
import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import useLogin from "@/hooks/useLogin";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";

type LoginScreenProps = {
    navigation: StackNavigationProp<HomePageStackParamList>;
};

type LoginForm = {
    email: string;
    password: string;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
    const methods = useForm<LoginForm>();
    const { handleLogin, isLoading, isError } = useLogin();

    return (
        <FormProvider {...methods}>
            <ThemedView>
                <Header />
                <View style={styles.container}>
                    <Text variant="headlineSmall" style={styles.containerHeader}>
                        Login
                    </Text>
                    <FormInput
                        label="Email"
                        formKey="email"
                        placeholder="Enter your username"
                        rules={{ required: "Username is required" }}
                    />
                    <FormInput
                        label="Password"
                        formKey="password"
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        rules={{ required: "Password is required" }}
                    />
                    <NavigationLink
                        onPress={() => navigation.navigate("Signup" as any)}
                        text="Don't have an account?"
                        linkText="Sign Up"
                    />
                    <Button
                        style={{ marginTop: 15 }}
                        icon="login"
                        mode="contained"
                        onPress={
                            methods.handleSubmit(async (data: LoginForm) => {
                                await handleLogin(data.email, data.password);
                            })}
                    >
                        Login
                    </Button>
                </View>
            </ThemedView>
        </FormProvider>
    );
};

const styles = StyleSheet.create({
    container: { display: "flex", gap: 15, margin: 20, marginTop: 40 },
    containerHeader: { fontWeight: "700", marginBottom: 10 },
});

export default LoginScreen;
