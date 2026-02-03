import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseconfig";
import { z } from "zod";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const emailSchema = z.string().email("Please enter a valid email address.");

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/invalid-email":
        return "Invalid email address.";
      default:
        return "Failed to send reset email. Please try again.";
    }
  };

  const sendResetLink = async (email) => {
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent! Check your inbox.");
      return true; 
    } catch (err) {
      console.error("Reset Password Error:", err.code);
      toast.error(getErrorMessage(err.code));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendResetLink,
  };
};