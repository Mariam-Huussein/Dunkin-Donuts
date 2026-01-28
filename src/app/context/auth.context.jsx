// import { createContext, useState } from "react";
// import { auth } from "../../../firebaseconfig";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import toast from "react-hot-toast";
// import { Navigate, useNavigate } from "react-router-dom";

// export const UserDataContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [userData, setUserData] = useState(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null,
//   );

//   const errorMessages = {
//     "auth/invalid-email": "Please enter a valid email.",
//     "auth/user-disabled": "This account has been disabled. Contact support.",
//     "auth/user-not-found": "No account found with this email.",
//     "auth/wrong-password": "Incorrect password. Please try again.",
//     "auth/missing-password": "Password is required.",
//     "auth/too-many-requests":
//       "Too many failed attempts. Please try again later.",
//     "auth/invalid-credential": "Invalid email or password. Please try again.",
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const user = userCredential.user;

//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName || "",
//         }),
//       );

//       console.log(email, password);
//       return <Navigate to="/" />;
//     } catch (err) {
//       const message =
//         errorMessages[err.code] || "Login failed. Please try again.";
//       console.log("Firebase Error Code:", err.code);
//       setError(message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem("user");
//       return <Navigate to="/" />;
//     } catch (error) {
//       toast.error("Logout failed:");
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <UserDataContext.Provider
//       value={{ userData, setUserData, handleLogout, handleSignIn }}
//     >
//       {children}
//     </UserDataContext.Provider>
//   );
// }

import { createContext, useState } from "react";
import { auth } from "../../../firebaseconfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Context responsible for authentication state and actions
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

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

      toast.success("Logged in successfully");
      navigate("/");
      window.location.reload();
    } catch (err) {
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
    try {
      await signOut(auth);
      setUserData(null);
      localStorage.removeItem("user");

      toast.success("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleSignIn,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
