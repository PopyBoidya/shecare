// Context.jsx
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../Firebase/Firebase";

// 🔔 Push Notification
import { messaging } from "../Firebase/Firebase"; // Import only messaging from Firebase.js
import { getToken as getFcmToken } from "firebase/messaging"; // Import getToken directly

export const Contexts = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState(null); // save token locally

  // 🔔 Request FCM Token
  const requestFcmPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getFcmToken(messaging, {
          vapidKey: "BEsBpI6ZRCsPusnt3alWMPhsGrJxFyNYXS6PnSEyvHIH7F9LPpCWrcYkOf0DMxPupxJcrLvKHWJrYPR6VN0pKdA" // Your VAPID key
        });
        setFcmToken(token);
        console.log("🔥 FCM Token:", token);
        // 👉 Send this token to your backend to store
      } else {
        console.warn("Notification permission not granted.");
      }
    } catch (error) {
      console.error("FCM error:", error);
    }
  };

  // Observe user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        requestFcmPermission(); // 🔔 call on login
      }
    });

    return () => unSubscribe();
  }, []);

  const provider = new GoogleAuthProvider();
  const google = () => {
    setLoading(true);
    return signInWithPopup(auth, provider).finally(() => setLoading(false));
  };

  const createUser = (name, email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: name }).then(() => {
          return sendEmailVerification(user);
        });
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in.");
        }
        return userCredential;
      })
      .finally(() => setLoading(false));
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const LogOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setFcmToken(null);
      })
      .finally(() => setLoading(false));
  };

  const info = {
    user,
    loading,
    google,
    createUser,
    loginUser,
    forgotPassword,
    LogOutUser,
    fcmToken, // optional: you can use it elsewhere
  };

  return <Contexts.Provider value={info}>{children}</Contexts.Provider>;
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;