import { createContext, useState } from "react";
import { auth } from "../../../firebaseconfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Context responsible for authentication state and actions
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Holds current logged-in user data
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Firebase error messages mapping
  const errorMessages = {
    "auth/invalid-email": "Please enter a valid email.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/missing-password": "Password is required.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
  };

  /**
   * Handles user login using email & password
   * Saves user data in state and localStorage
   */
  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || "",
      };

      setUserData(user);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      navigate("/home");
      toast.success(`welcome, ${user.displayName}`);
    } catch (err) {
      setLoading(false);
      const message =
        errorMessages[err.code] || "Login failed. Please try again.";
      toast.error(message);
      console.error("Firebase Error:", err.code);
    }
  };

  /**
   * Logs out the current user
   * Clears localStorage and auth state
   */
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserData(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setLoading(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loading,
        setUserData,
        handleSignIn,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
