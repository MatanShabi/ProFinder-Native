import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import { getAuth, signOut } from "firebase/auth";

type LogoutScreenNavigationProp = StackNavigationProp<HomePageStackParamList>;

const useLogout = () => {
    const navigation = useNavigation<LogoutScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const showAlert = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => navigation.navigate("Posts" as any),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setIsLoading(true);
                        const auth = getAuth();
                        try {
                            await signOut(auth);
                            setIsLoading(false);
                            setIsError(false);
                            setError(null);
                        } catch (error: any) {
                            setIsError(true);
                            setError(error.message ? String(error.message) : "Failed to sign out");
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            showAlert();
        });

        return unsubscribe;
    }, [navigation]);

    return { showAlert, isLoading, isError, error };
};

export default useLogout;
