// @ts-nocheck
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();
  auth.signOut();
  return <Navigate to="/" replace={true} />;
}
