import { useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { handlePictureAPI } from '../scripts/handlePictureAPI'; 

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<
    UserCredential | undefined
  >(undefined);

  const updateUserProfile = async (user: User, 
     firstName: string,
     lastName: string,
     photoUrl: string ) => {
    if (user) {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoUrl
      });
    }
  };

  const createUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const pictureBlob = await handlePictureAPI(firstName, lastName);
      
      const storageRef = ref(storage, `profilePictures/${email}.png`);
      await uploadBytes(storageRef, pictureBlob);
      
      const downloadURL = await getDownloadURL(storageRef);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(user.user, firstName, lastName, downloadURL);
      setUserCredentials(user);

    } catch (error) {
      setIsError(true);
      console.error("Error creating user: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, updateUserProfile, userCredentials, isLoading, isError };
};

export default useSignUp;
