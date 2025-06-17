"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface DecodedToken {
  id?: string; // Thêm property id
  _id?: string; // Thêm _id để support MongoDB
  name: string;
  role: string;
  email?: string;
  exp?: number;
}

const UserContext = createContext<{
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
