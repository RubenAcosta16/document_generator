// src/components/Register.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../context/userStore";
import { registerUser } from "../services/api";

const Register: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      document.getElementById("register-email") as HTMLInputElement
    ).value;
    const username = (
      document.getElementById("register-username") as HTMLInputElement
    ).value;
    const password = (
      document.getElementById("register-password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      document.getElementById("register-confirm-password") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser(username, email, password);
      alert("Register successful");
      navigate("/login");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>

        <label htmlFor="register-username">Username</label>
        <input type="text" id="register-username" required />

        <label htmlFor="register-email">Email</label>
        <input type="text" id="register-email" required />

        <label htmlFor="register-password">Password</label>
        <input type="password" id="register-password" required />

        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input type="password" id="register-confirm-password" required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
