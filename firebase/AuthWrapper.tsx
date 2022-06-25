import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import userState from "../state/user";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./clientApp";
import user from "../state/user";

function AuthWrapper({ children }) {
  const [userValue, setUser] = useRecoilState(userState);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        console.log("no user");
        return;
      }

      try {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        setUser(docSnap.data());
        console.log("changed user", docSnap.data());
      } catch (e) {
        setUser(null);
        console.log("changed user");
      }
    });
  }, []);

  useEffect(() => {
    console.log("user changed", user);
  }, [userValue]);

  return <>{children}</>;
}

export default AuthWrapper;
