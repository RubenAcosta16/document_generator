import React, { useState } from "react";
import { Link } from "react-router-dom";

import { handleLogout } from "./modules/Auth/functions/logout";

import { useAuth } from "./modules/Auth/hooks/useAuth";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser, setCurrentUser } = useAuth({
    loadingFn: () => setLoading(false),
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {currentUser ? (
        <div className="form-container">
          <h2>Hello, {currentUser.name}!</h2>
          <p>Admin Panel</p>
          <button
            onClick={() => {
              handleLogout(setCurrentUser);
            }}
          >
            Logout
          </button>
          <br />
          <Link to="/protected">
            <button>Go to Protected Page</button>
          </Link>

          <br />

          <Link to="/templates">
            <button>Go to Templates</button>
          </Link>
        </div>
      ) : (
        // <Navigate to="/login" />
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default App;
