import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        data-testid="admin-loading"
        style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
      >
        Lädt…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}
