import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ErrorNotification from "@/components/ErrorNotification";
import useAddPost from "../../hooks/useAddPost";

const AddPostScreen = () => {
  const navigation = useNavigation<any>();

  const {
    title,
    description,
    link,
    price,
    image,
    errors,
    isLoading,
    isError,
    error,
    setTitle,
    setDescription,
    setLink,
    setPrice,
    handlePickImage,
    handleDeleteImage,
    handleSubmit,
  } = useAddPost(navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
        multiline
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}
      <TextInput
        placeholder="Link"
        value={link}
        onChangeText={setLink}
        style={styles.input}
      />
      {errors.link && <Text style={styles.error}>{errors.link}</Text>}
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.error}>{errors.price}</Text>}
      <View style={styles.imagePicker}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <IconButton
              icon="close"
              size={20}
              onPress={handleDeleteImage}
              style={styles.deleteButton}
              accessibilityLabel="Delete Image"
            />
          </View>
        ) : (
          <Button mode="outlined" onPress={handlePickImage}>
            Add Image
          </Button>
        )}
      </View>
      {isLoading ? (
        <Modal transparent={false} animationType="none">
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size={120} />
          </View>
        </Modal>
      ) : (
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      )}
      {isError && (
        <ErrorNotification
          visible={isError}
          errorMessage={error || ""}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  descriptionInput: {
    minHeight: 100,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddPostScreen;
