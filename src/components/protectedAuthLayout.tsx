import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
interface ProtectedAuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

const ProtectedAuthLayout: React.FC<ProtectedAuthLayoutProps> = ({
  children,
  authentication,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const authStatus=useAppSelector(state=>state.user.AuthState)||false;

  useEffect(() => {
    if (!authentication) {
      navigate("/login", { state: { from: location } });
    } else if (!authStatus) {
      setLoader(false); 
    } else {
      const redirectTo = location.state?.from?.pathname || "/";
      if (location.pathname !== redirectTo) {
        navigate(redirectTo);
      }
      setLoader(false); 
    }
  }, [authentication, authStatus, navigate, location]);

  return loader ? (
    <h1 className="w-full text-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default ProtectedAuthLayout;
