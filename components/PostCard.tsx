import { Post } from "@/types/post";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Linking, View } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Subheading,
  Text,
  IconButton,
} from "react-native-paper";

export const CARD_HIGHT = 180;

interface PostCardProps {
  post: Post;
  isAdmin: boolean;
  handleEditPost: (postId: string) => void;
  handleDeletePost: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  handleEditPost,
  handleDeletePost,
  isAdmin,
}) => (
  <Card style={styles.card}>
    {post.imageURL && (
      <Card.Cover source={{ uri: post.imageURL }} style={styles.cardImage} />
    )}
    <Card.Content style={styles.cardContent}>
      <Title style={styles.title}>{post.title}</Title>
      <Paragraph style={styles.description}>{post.description}</Paragraph>
      <Subheading style={styles.price}>{post.price}₪</Subheading>
      <TouchableOpacity onPress={() => Linking.openURL(post.link)}>
        <Text style={styles.link} numberOfLines={1} ellipsizeMode="tail">
          {post.link}
        </Text>
      </TouchableOpacity>
      {isAdmin && (
        <View style={styles.adminContent}>
          <IconButton
            icon="delete"
            iconColor="red"
            onPress={() => handleDeletePost(post.id || "")}
          />
          <IconButton
            icon="pencil"
            iconColor="blue"
            onPress={() => handleEditPost(post.id || "")}
          />
        </View>
      )}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  cardImage: {
    height: CARD_HIGHT,
    width: "100%",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  price: {
    marginTop: 8,
  },
  link: {
    marginTop: 8,
    fontSize: 14,
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
  adminContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default memo(PostCard);
