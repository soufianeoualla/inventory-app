"use client";
import { getUserById } from "@/data/user";
import { getSession } from "next-auth/react";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  setUser: Dispatch<SetStateAction<string>>;
  user: string;
}

export const UserContext = createContext<ContextProps>({
  setUser: () => {},
  user: "",
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const getUserRole = async () => {
      const session = await getSession();
      const userData = await getUserById(session?.user?.id);
      setUser(userData?.role!);
    };
    getUserRole();
  }, []);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};
