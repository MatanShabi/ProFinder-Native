import { auth } from "@/config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if(currentUser){
        setUser(currentUser);
      } else {
        setUser(null)
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return {user};
};

export default useUser;
