import { useState } from "react";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [userCradentials, SetUserCrendntials] = useState<
    UserCredential | undefined
  >(undefined);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      SetUserCrendntials(user);
      setIsLoading(false);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, userCradentials, isLoading, isError };
};

export default useLogin;
