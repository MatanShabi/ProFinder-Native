import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import usePosts from "@/hooks/usePosts";
import ErrorNotification from "@/components/ErrorNotification";
import PostCard from "@/components/PostCard";

const PostsScreen = () => {
  const {
    posts,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
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
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : isError ? (
        <ErrorNotification
          visible={isError}
          errorMessage="Failed to load posts"
        />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          getItemLayout={(data, index) => (
            { length: posts.length, offset: 3 * index, index }
          )}
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
    paddingTop: 16,
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
});

export default PostsScreen;
