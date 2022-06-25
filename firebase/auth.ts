import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "./clientApp";

const registerCustomer = async (email, password, phone, name) => {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", email), {
      email,
      name,
      phone,
      owner: false,
    });

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    return [userCredential, docSnap.data()];
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const registerOwner = async (email, password, phone, name, address) => {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", email), {
      email,
      name,
      phone,
      address,
      owner: true,
    });

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    return [userCredential, docSnap.data()];
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const login = async (email, password) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    return [userCredential, docSnap];
  } catch (e) {
    throw new Error(e);
  }
};

const logout = () => {
  const auth = getAuth();
  signOut(auth);
};

export { registerCustomer, registerOwner, login };
