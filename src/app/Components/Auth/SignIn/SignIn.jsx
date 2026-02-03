import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../context/auth.context";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Access authentication actions from context
  const { handleSignIn, loading } = useContext(AuthContext);

  /**
   * Handles form submission
   * Calls context login function with email & password
   */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  return (
    <div className="p-4 border rounded w-100" style={{ maxWidth: "400px" }}>
      <h2 className="title text-center mb-4">Sign In</h2>

      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
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

        {/* Button */}
        <button type="submit" className="my-btn my-btn-primary w-100" disabled={loading}>
          {
            loading ? "Please Wait.." : "Sign In"
          }
        </button>

        {/* Links */}
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
