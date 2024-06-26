import { useState, useCallback } from "react";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import useUser from "@/hooks/useUser";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect } from "expo-router/build/useFocusEffect";
import { generateRandomName } from "../scripts/generateRandomName";
import { useAppDispatch } from "@/store/hooks";
import { createPost } from "@/store/slices/posts/thunk";
import { useSelector } from "react-redux";
import { selectCreatePost } from "@/store/slices/posts/selector";

const DEFAULT_IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/wise-buyer-android-1ab6e.appspot.com/o/profilePictures%2Fdefault_post_image.jpg?alt=media&token=82055e58-321e-4caf-9e44-4ee4c1bbf99a";

const useAddPost = (navigation: NavigationProp<any>) => {
  const { user } = useUser();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    link: "",
    price: "",
  });

  const {isLoading, isError, error} = useSelector(selectCreatePost)

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTitle("");
        setDescription("");
        setLink("");
        setPrice("");
        setImage(null);
        setErrors({ title: "", description: "", link: "", price: "" });
      };
    }, [])
  );

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log('"Failed to pick image"')
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const validate = () => {
    let valid = true;
    let newErrors = { title: "", description: "", link: "", price: "" };

    if (title.length > 70) {
      newErrors.title = "Title must be 70 characters or less";
      valid = false;
    }

    if (description.length > 300) {
      newErrors.description = "Description must be 300 characters or less";
      valid = false;
    }

    if (link.length > 300) {
      newErrors.link = "Link must be 300 characters or less";
      valid = false;
    }

    if (!/^\d*\.?\d+$/.test(price)) {
      newErrors.price = "Price must be a numeric value";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        let downloadURL = DEFAULT_IMAGE_URL; 

        if (image !== null) {
          const imageFileName = generateRandomName() + "." + image.split(".").pop();
          const response = await fetch(image);
          const pictureBlob = await response.blob();

          const storageRef = ref(storage, `profilePictures/${imageFileName}`);
          await uploadBytes(storageRef, pictureBlob);

          downloadURL = await getDownloadURL(storageRef);
        }

        dispatch(createPost({
          title,
          description,
          link,
          price: parseFloat(price),
          imageURL: downloadURL,
          userEmail: user?.email || '',
          lastUpdate: new Date()
        }))
          
        navigation.goBack();
      } catch (e) {
        console.log("Failed to upload post. Please try again later.")
      }        
    } else {
      console.log("Validation Error: Please correct the errors in the form.")
    }
  };

  return {
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
  };
};

export default useAddPost;
