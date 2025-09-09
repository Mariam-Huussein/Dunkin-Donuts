import { useState } from "react";
import { auth } from "./../../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must include at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/weak-password":
        return "Password should be at least 8 characters.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      setSuccess("Account created successfully! ");
      setTimeout(() => navigate("/auth/sign-in"), 1500);
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  return (
    <div className="p-4 border rounded w-100" style={{ maxWidth: "400px" }}>
      <h2 className="title text-center mb-4">Sign Up</h2>
      <form onSubmit={handleRegister} className="d-flex flex-column gap-3">
        <div>
          <label className="title form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="position-relative">
          <label className="title form-label">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon position-absolute end-0 me-3 text-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="my-btn my-btn-primary w-100">
          Sign Up
        </button>
        <p className="mt-3 text-center link-txt">
          Already have an account? <Link to="/auth/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
