import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.init.js";
import { doc, setDoc } from "firebase/firestore";
import { axiosInstance } from "../axios/axios.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // helper functions
  const getJWT = async (uid, email) => {
    try {
      const res = await axiosInstance.post('/token', {
        uid,
        email
      })

      return res.data.token;
    }
    catch (err) {
      console.error(err)
    }
  }



  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // Sign up
  const signup = async (email, password, fullName) => {
    // creating user
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // updating username
    if (fullName) {
      await updateProfile(userCred.user, { displayName: fullName });
    }

    const { uid, email: userEmail } = userCred.user;
    // saving user in firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      fullName,
      email,
      createdAt: new Date()
    })

    // Set jwt token
    const jwtToken = await getJWT(uid, email);
    localStorage.setItem("jwt", jwtToken);

    return userCred;
  };

  // Login
  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail } = userCred.user;

    const jwtToken = await getJWT(uid, email);
    localStorage.setItem("jwt", jwtToken)

    return userCred;
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("jwt");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
