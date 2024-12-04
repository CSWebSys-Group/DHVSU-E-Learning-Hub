import { AppContextType, UsersType } from "@/lib/types";
import { fetchUser, getCookie } from "@/lib/utils";
import Cookies from "js-cookie";
import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext<AppContextType | null>(null);

type ParamType = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: ParamType) {
  const [token, setToken] = useState(getCookie("authToken"));
  const [user, setUser] = useState<UsersType | null>(null);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setUser(null); // Reset user state if token is removed
    }
  }, [token]);

  async function fetchUserData() {
    const userData = await fetchUser(token);
    if (!userData) {
      Cookies.remove("authToken");
      setUser(null);
      setToken(null);
    } else {
      setUser(userData);
    }
  }

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ token, setToken, user, setUser }),
    [token, user]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
