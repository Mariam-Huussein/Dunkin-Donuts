import { useState } from "react";
import { Link } from "react-router-dom";
import PageLoader from "../../Common/Loader/Loader";
import SpinnerOverlay from "../../Common/Loader/SpinnerOverlay";
import { useForgotPassword } from "../../../hooks/useForgotPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  
  const { loading, sendResetLink } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await sendResetLink(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <>
      <SpinnerOverlay loading={loading} />
      
      <div
        className="p-4 border rounded w-100"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2 className="title text-center mb-4">Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="title form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
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