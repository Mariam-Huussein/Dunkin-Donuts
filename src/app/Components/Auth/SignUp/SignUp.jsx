import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUp } from "../../../hooks/useSignUp";

function SignUp() {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Call Custom Hook
  const { registerUser, loading, error, success } = useSignUp();

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(name, email, password, confirmPassword);
  };

  return (
    <div className="p-4 border rounded w-100" style={{ maxWidth: "400px" }}>
      <h2 className="title text-center mb-4">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        
        {/* Name Input */}
        <div>
          <label className="title form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="title form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
          />
        </div>

        {/* Password Input */}
        <div className="position-relative">
          <label className="title form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <span
            className="eye-icon position-absolute end-0 top-50 translate-middle-y me-3 mt-3 text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="position-relative">
          <label className="title form-label">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <span
            className="eye-icon position-absolute end-0 top-50 translate-middle-y me-3 mt-3 text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error & Success Messages */}
        {error && <div className="alert alert-danger p-2 small">{error}</div>}
        {success && <div className="alert alert-success p-2 small">{success}</div>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="my-btn my-btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-3 text-center link-txt">
          Already have an account? <Link to="/auth/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;