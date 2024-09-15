import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      // Show toast notification when unauthorized access is attempted
      toast.error("Please log in to access this page.");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
