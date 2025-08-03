import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedPage: React.FC = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth({
    elseFn: () => navigate("/login"),
  });

  return currentUser ? (
    <div className="form-container">
      <h2>Protected Page</h2>
      <p>Welcome, {currentUser.name}!</p>
      <Link to="/templates">Go to templates</Link>
    </div>
  ) : null;
};

export default ProtectedPage;
