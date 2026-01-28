import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpinnerOverlay from "./SpinnerOverlay";

export default function PageLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <SpinnerOverlay loading={loading} />
      {children}
    </>
  );
}
