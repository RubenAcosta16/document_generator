// src/components/Login.tsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import useUser from "../context/userStore";
import { loginUser } from "../services/api";

const Login: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginEmail = (
      document.getElementById("login-email") as HTMLInputElement
    ).value;
    const loginPassword = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;

    try {
      await loginUser(loginEmail, loginPassword);
      alert("Login successful");
      navigate("/");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="login-email">Email</label>
        <input type="text" id="login-email" required />

        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" required />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
