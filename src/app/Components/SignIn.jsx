import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "./../../../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const errorMessages = {
    "auth/invalid-email": "Please enter a valid email.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/missing-password": "Password is required.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
        })
      );

      console.log(email, password);
      navigate("/");
      window.location.reload();
    } catch (err) {
      const message =
        errorMessages[err.code] || "Login failed. Please try again.";
      console.log("Firebase Error Code:", err.code);
      setError(message);
    }
  };

  return (
    <div className="p-4 border rounded w-100" style={{ maxWidth: "400px" }}>
      <h2 className="title text-center mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="d-flex flex-column gap-3">
        {/* Email */}
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

        {/* Password */}
        <div className="position-relative">
          <label className="title form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon position-absolute end-0 me-3 text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Button */}
        <button type="submit" className="my-btn my-btn-primary w-100">
          Sign In
        </button>

        {/* Link */}
        <p className="mt-3 text-center link-txt">
          Don’t have an account? <Link to="/auth/sign-up">Sign Up</Link>
        </p>
        <p className="mt-2 text-center link-txt">
          <Link to="/auth/forgot-password">Forgot your password?</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
