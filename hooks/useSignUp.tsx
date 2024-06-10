import { useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<
    UserCredential | undefined
  >(undefined);

  const updateUserProfile = async (user: User, firstName: string, lastName: string) => {
    if (user) {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(user.user, firstName, lastName);
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

export default useSignUp;
