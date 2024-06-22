import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card, Text, Title, Paragraph, Subheading } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import usePosts, { Post } from "../../hooks/usePosts"; 
import ErrorNotification from "@/components/ErrorNotification";

const renderPost = ({ item }: { item: Post }) => (
  <Card style={styles.card}>
    {item.imageURL && (
      <Card.Cover source={{ uri: item.imageURL }} style={styles.cardImage} />
    )}
    <Card.Content style={styles.cardContent}>
      <Title style={styles.title}>{item.title}</Title>
      <Paragraph style={styles.description}>{item.description}</Paragraph>
      <Subheading style={styles.price}>{item.price}₪</Subheading>
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
        <Text style={styles.link} numberOfLines={1} ellipsizeMode="tail">
          {item.link}
        </Text>
      </TouchableOpacity>
    </Card.Content>
  </Card>
);

const PostsScreen = () => {
  const {
    posts,
    isLoading,
    isError,
    refreshing,
    searchQuery,
    setSearchQuery,
    handleRefresh,
    errorMessage,
    setIsError,
  } = usePosts();

  return (
    <ThemedView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      {isLoading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : isError && !refreshing ? (
        <ErrorNotification
          visible={isError}
          errorMessage={errorMessage}
          onDismiss={() => {
            setIsError(false);
          }}
        />

      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  list: {
    padding: 14,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  cardImage: {
    height: 180,
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
});

export default PostsScreen;
