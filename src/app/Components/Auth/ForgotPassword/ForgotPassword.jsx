import { useState } from "react";
import { auth } from "../../../../../firebaseconfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import PageLoader from "../../Common/Loader/Loader";
import toast from "react-hot-toast";
import SpinnerOverlay from "../../Common/Loader/SpinnerOverlay";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset link sent! Check your email.");
      toast.success(success);
    } catch (err) {
      console.log("Firebase Error Code:", err.code);
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
        toast.error(error);
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
        toast.error(error);
      } else {
        setError("Failed to send reset email. Please try again later.");
        toast.error(error);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <SpinnerOverlay loading={loading} />
      <div
        className="p-4 border rounded w-100"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2 className="title text-center mb-4">Forgot Password</h2>
        <form
          onSubmit={handleResetPassword}
          className="d-flex flex-column gap-3"
        >
          <div>
            <label className="title form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="my-btn my-btn-primary w-100"
            disabled={loading}
          >
            {loading ? <PageLoader /> : "Send Reset Link"}
          </button>

          <p className="mt-3 text-center link-txt">
            Remembered your password? <Link to="/auth/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
