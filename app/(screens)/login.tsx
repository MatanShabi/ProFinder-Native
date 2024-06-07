import 'react-native-reanimated';

import { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomePageStackParamList } from '@/components/navigation/HomePageNavigation';


type LoginScreenProps = {
    navigation: StackNavigationProp<HomePageStackParamList>;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
    const { colors } = useTheme()

    return (
        <ThemedView>
            <Text variant='displayMedium' style={{ textAlign: 'center', marginTop: 100, color: colors.primary, fontWeight: 700 }}>
                ProFinder
            </Text>
            <View style={{ display: 'flex', gap: 15, margin: 20, marginTop: 40 }}>
                <Text variant='headlineSmall' style={{ fontWeight: 700, marginBottom: 10 }}>
                    Login
                </Text>
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
                <Text
                    onPress={() => navigation.navigate('Signup')}
                >
                    Don't have an account? Sign Up
                </Text>
                <Button
                    style={{ marginTop: 15 }}
                    icon='login'
                    mode="contained"
                >
                    Login
                </Button>
            </View>
        </ThemedView>
    );
}

export default LoginScreen;