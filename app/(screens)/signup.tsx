import { ThemedView } from "@/components/ThemedView";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

type SignUpScreenProps = {
    navigation: StackNavigationProp<HomePageStackParamList>;
};


const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {

    const { colors } = useTheme()
    return (
        <ThemedView>
            <Text variant='displayMedium' style={{ textAlign: 'center', marginTop: 100, color: colors.primary, fontWeight: 700 }}>
                ProFinder
            </Text>
            <View style={{ display: 'flex', gap: 15, margin: 20, marginTop: 40 }}>
                <Text variant='headlineSmall' style={{ fontWeight: 700, marginBottom: 10 }}>
                    Sign Up
                </Text>
                <Text variant='bodyLarge'>
                    Username
                </Text>
                <TextInput
                    mode='outlined'
                    placeholder='Your Unique Username'
                    style={{ backgroundColor: '#1E1E2D' }}
                />
                <Text variant='bodyLarge'>
                    Email
                </Text>
                <TextInput
                    mode='outlined'
                    placeholder='User Email'
                    style={{ backgroundColor: '#1E1E2D' }}
                />
                <Text variant='bodyLarge'>
                    Password
                </Text>
                <TextInput
                    mode='outlined'
                    placeholder='User Password'
                    style={{ backgroundColor: '#1E1E2D' }}
                />
                <Text variant='bodyLarge'>
                    Re-Password
                </Text>
                <TextInput
                    mode='outlined'
                    placeholder='Revalidate Password'
                    style={{ backgroundColor: '#1E1E2D' }}
                />
                <Text
                    onPress={() => navigation.navigate('Login')}
                >
                    Already have an account? Login
                </Text>
                <Button
                    style={{ marginTop: 15 }}
                    icon="send"
                    mode="contained"
                >
                    SingUp
                </Button>
            </View>
        </ThemedView>
    )
}

export default SignUpScreen;