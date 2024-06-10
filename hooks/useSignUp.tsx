import { useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [userCradentials, SetUserCrendntials] = useState<
    UserCredential | undefined
  >(undefined);

  const createUser = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      SetUserCrendntials(user);
      setIsLoading(false);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, userCradentials, isLoading, isError };
};

export default useSignUp;
