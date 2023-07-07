import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase";
import axios from "axios";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const auth = getAuth(app);

export const mainContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const fbLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };
  const googleLogin = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const forgot = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // const emailVerify = (email) => {
  //   return sendEmailVerification(email);
  // };

  const upDateProfile = (names, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: names,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser?.email) {
        axios
          .post("http://localhost:5000/jwt", { email: currentUser.email })
          .then((res) => {
            localStorage.setItem("access_token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access_token");
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const [name, setName] = useState({});

  const info = (
    name,
    address,
    monthFee,
    specialFund,
    pin,
    phone,
    email,
    blood
  ) => {
    setName({ name, address, monthFee, specialFund, pin, phone, email, blood });
  };

  const userInfo = {
    createUser,
    signIn,
    user,
    loading,
    logOut,
    fbLogin,
    forgot,
    // emailVerify,
    info,
    name,
    googleLogin,
    upDateProfile,
  };

  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <mainContext.Provider value={userInfo}>{children}</mainContext.Provider>
      </QueryClientProvider>
    </div>
  );
};

export default AuthProvider;
