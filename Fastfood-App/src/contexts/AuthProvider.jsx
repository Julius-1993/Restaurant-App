import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../components/firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create an Account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signup with email account
  const signUPWithGmail = () => {
    return signInWithPopup(auth, googleprovider);
  };

  // Login using email and password
  const login = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Logout
  const logout = () => {
    signOut(auth)
  }
  //Update Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    })
  }
  //checked signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false)
      } else {
        // User is signed out
        // ...
      }});
      return () =>{
        return unsubscribe();
      }
  }, [])
  const authInfo = {
    user,
    createUser,
    signUPWithGmail,
    login,
    logout,
    updateUserProfile
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
