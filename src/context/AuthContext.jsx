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
import toast from "react-hot-toast";

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
      toast.error(err.message)
      return null;
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
    try {
      // 1️⃣ Create Firebase user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Update display name
      if (fullName) {
        await updateProfile(userCred.user, { displayName: fullName });
      }

      const { uid, email: userEmail } = userCred.user;

      // 3️⃣ Get JWT first (important: do it before Firestore)
      const jwtToken = await getJWT(uid, userEmail);
      if (!jwtToken) throw new Error("JWT creation failed");

      // 4️⃣ Save user in Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        fullName,
        email: userEmail,
        createdAt: new Date()
      });

      // 5️⃣ Store JWT
      localStorage.setItem("jwt", jwtToken);

      return userCred;

    } catch (err) {
      // ❌ If any step fails, rollback: delete Firebase user
      if (auth.currentUser) {
        await auth.currentUser.delete().catch(() => { }); // ignore deletion errors
      }
      // toast.error(err.message || "Signup failed");
      throw err; // propagate the error
    }
  };


  // Login
  const login = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = userCred.user;

      const jwtToken = await getJWT(uid, userEmail);
      if (!jwtToken) throw new Error("JWT creation failed");

      localStorage.setItem("jwt", jwtToken);

      return userCred;
    } catch (err) {
      // toast.error(err.message || "Login failed");
      throw err;
    }
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
