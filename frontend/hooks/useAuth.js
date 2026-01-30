import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    
  };

  return { user, isAuthenticated: !!user, logout };
}
