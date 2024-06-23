import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  RefreshControl,
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
          renderItem={({ item }) => <PostCard post={item} />}
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
