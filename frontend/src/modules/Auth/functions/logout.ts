
import { logoutUser } from "../services/api";
import { UserI } from "../types";

export const handleLogout = (
  setCurrentUser: (newUser: UserI | null) => void
) => {
  async function tryIt() {
    const success = await logoutUser();

    if (success) {
      setCurrentUser(null);
      localStorage.removeItem("user-storage");
      alert("Logout successful!");
    } else {
      alert("Error: Unable to logout.");
    }
  }

  tryIt();
};
