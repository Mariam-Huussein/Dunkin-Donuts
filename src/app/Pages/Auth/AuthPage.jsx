import { useParams } from "react-router-dom";
import SignIn from "../../Components/Auth/SignIn/SignIn";
import SignUp from "../../Components/Auth/SignUp/SignUp";
import "./AuthPage.css";
import ForgotPassword from "../../Components/Auth/ForgotPassword/ForgotPassword";

function Auth() {
  const { type } = useParams();

  if (type !== "sign-in" && type !== "sign-up" && type !== "forgot-password") {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="container-auth container d-flex justify-content-center align-items-center">
      {type === "sign-in" && <SignIn />}
      {type === "sign-up" && <SignUp />}
      {type === "forgot-password" && <ForgotPassword />}
    </div>
  );
}

export default Auth;
