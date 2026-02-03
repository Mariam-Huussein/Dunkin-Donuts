import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2. Schema 
  const signUpSchema = z
    .object({
      name: z.string().min(1, "Name is required."),
      email: z.string().email("Please enter a valid email."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[a-z]/, "Password must include at least one lowercase letter.")
        .regex(/[0-9]/, "Password must include at least one number."),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"], 
    });

  // Helper: Map Firebase errors
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use": return "This email is already registered.";
      case "auth/invalid-email": return "Please enter a valid email.";
      case "auth/weak-password": return "Password should be at least 8 characters.";
      default: return "Something went wrong. Please try again.";
    }
  };

  const registerUser = async (name, email, password, confirmPassword) => {
    setError("");
    setSuccess("");

    const validationResult = signUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      const firstErrorMessage = validationResult.error.errors[0].message;
      setError(firstErrorMessage);
      toast.error(validationResult.error.errors[0].message)
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });
      setSuccess("Account created successfully!");
      toast.success("Account created successfully!")
      setTimeout(() => navigate("/auth/sign-in"), 1200);
      
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
    success,
  };
};