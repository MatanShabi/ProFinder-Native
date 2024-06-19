import { useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import axios from "axios"; 

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
      let apiUrl = 'https://ui-avatars.com/api/'
      apiUrl += `?name=${encodeURIComponent(firstName + " " + lastName)}&size=200&color=fff&rounded=true`
      const randomBackgroundColor = generateRandomColor();
      apiUrl += `&background=${encodeURIComponent(randomBackgroundColor)}`;
      const response = await axios.get(apiUrl, { responseType: 'blob' });
      const pictureBlob = await response.data;

      const storageRef = ref(storage, `profilePictures/${email}.png`);

      await uploadBytes(storageRef, pictureBlob)
      
      const downloadURL = await getDownloadURL(storageRef);

      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(user.user, firstName, lastName, downloadURL);
      setUserCredentials(user)

    } catch (error) {
      setIsError(true);
      console.error("Error creating user: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, updateUserProfile, userCredentials, isLoading, isError };
};

function generateRandomColor(): string {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - random.length) + random;
}

export default useSignUp;