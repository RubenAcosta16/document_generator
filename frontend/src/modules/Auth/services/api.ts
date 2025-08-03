// src/api.ts
import axios from "axios";
import { authUrl } from "../../../config";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${authUrl}/login`,
      { email, password },
      { withCredentials: true } // para incluir cookies
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error("Error de red. Intenta de nuevo.");
    }
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${authUrl}/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error desconocido");
    } else {
      throw new Error("Error de red. Intenta de nuevo.");
    }
  }
};

export const checkSession = async () => {
  try {
    const response = await axios.get(`${authUrl}/protected`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Sesión inválida");
    } else {
      throw new Error("Error de red. Intenta de nuevo.");
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${authUrl}/logout`, null, {
      withCredentials: true,
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error en logout:", error);
    return false;
  }
};
