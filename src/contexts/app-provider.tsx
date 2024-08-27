"use client";

import {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";

type User = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  created_at: string;
  updated_at: string;
};

interface AppContextInterface {
  sessionToken: string;
  handleSetSessionToken: (token: string) => void;
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const initialAppContext: AppContextInterface = {
  sessionToken: "",
  handleSetSessionToken: () => {},
  isModalOpen: false,
  handleModalOpen: () => {},
  user: null,
  setUser: () => {},
  isAuthenticated: false,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const [isModalOpen, setIsModalOpen] = useState(initialAppContext.isModalOpen);
  const [user, setUserState] = useState<User | null>(initialAppContext.user);

  const isAuthenticated = Boolean(user);
  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUserState(_user ? JSON.parse(_user) : null);
  }, []);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSetSessionToken = (token: string) => {
    setSessionToken(token);
  };

  console.log({ user, isAuthenticated, sessionToken });

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
        sessionToken,
        handleSetSessionToken,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
