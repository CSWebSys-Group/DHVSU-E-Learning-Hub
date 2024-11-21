import { AppContextType, UsersType } from "@/lib/types";
import { getCookie } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext<AppContextType | null>(null);

type ParamType = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: ParamType) {
  const [token, setToken] = useState(getCookie("authToken"));
  const [user, setUser] = useState<UsersType | null>(null);

  useEffect(() => {
    if (token) {
      getUser();
    }
    // Adding a dependency array to avoid infinite calls
  }, [token]);

  async function getUser() {
    try {
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Reset user state on error
    }
  }

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
