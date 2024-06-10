import { ThemedView } from "@/components/ThemedView";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import useUser from "@/hooks/useUser";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC } from "react";
import { Text } from "react-native-paper";

type SignUpScreenProps = {
    navigation: StackNavigationProp<HomePageStackParamList>;
};

const PostsScreen: FC<SignUpScreenProps> = ({ navigation }) => {
    const { user } = useUser()

    return (
        <ThemedView>
            <Text>POSTS</Text>
            <Text>Hello {user?.email}</Text>
        </ThemedView>
    );
};

export default PostsScreen;
