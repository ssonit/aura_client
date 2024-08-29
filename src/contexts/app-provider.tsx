"use client";

import {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
  useMemo,
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
  token: string;
  handleSetToken: (token: string) => void;
  refreshToken: string;
  handleSetRefreshToken: (token: string) => void;
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const initialAppContext: AppContextInterface = {
  token: "",
  handleSetToken: () => {},
  refreshToken: "",
  handleSetRefreshToken: () => {},
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
  initialToken = "",
  initialRefreshToken = "",
}: {
  children: React.ReactNode;
  initialToken?: string;
  initialRefreshToken?: string;
}) {
  const [token, setToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [isModalOpen, setIsModalOpen] = useState(initialAppContext.isModalOpen);
  const [user, setUserState] = useState<User | null>(initialAppContext.user);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);
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

  const handleSetToken = (token: string) => {
    setToken(token);
  };

  const handleSetRefreshToken = (token: string) => {
    setRefreshToken(token);
  };
  console.log({ user, isAuthenticated, token, refreshToken });

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
        token,
        handleSetToken,
        refreshToken,
        handleSetRefreshToken,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
