// src/hooks/useAuth.ts
import { useEffect } from "react";
import useUser from "../context/userStore";
import { checkSession } from "../services/api";

interface Props {
  elseFn?: () => void;
  loadingFn?: () => void;
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }
};

export const useAuth = ({ elseFn, loadingFn }: Props) => {
  const { currentUser, setCurrentUser } = useUser();
  const token = getCookie("access_token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        try {
          const data = await checkSession();
          setCurrentUser(data);
        } catch (error) {
          console.error("Error verifying session:", error);
          setCurrentUser(null);
          if (elseFn) elseFn();
        }
      }

      if (loadingFn) loadingFn();
    };

    checkAuth();
  }, [setCurrentUser]);

  return { currentUser, setCurrentUser };
};
