import { ThemedView } from "@/components/ThemedView";
import { HomePageStackParamList } from "@/components/navigation/HomePageNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC } from "react";
import { Text } from "react-native-paper";

type SignUpScreenProps = {
  navigation: StackNavigationProp<HomePageStackParamList>;
};

const PostsScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  return (
    <ThemedView>
      <Text>POSTS</Text>
    </ThemedView>
  );
};

export default PostsScreen;
