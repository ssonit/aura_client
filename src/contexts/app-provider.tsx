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
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  isModalUpdateBoard: boolean;
  handleModalUpdateBoard: (isOpen: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const initialAppContext: AppContextInterface = {
  isModalOpen: false,
  handleModalOpen: () => {},
  isModalUpdateBoard: false,
  handleModalUpdateBoard: () => {},
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
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(initialAppContext.isModalOpen);
  const [isModalUpdateBoard, setIsModalUpdateBoard] = useState(
    initialAppContext.isModalUpdateBoard
  );
  const [user, setUserState] = useState<User | null>(initialAppContext.user);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);
  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleModalUpdateBoard = (isOpen: boolean) => {
    setIsModalUpdateBoard(isOpen);
  };

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUserState(_user ? JSON.parse(_user) : null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
        isModalUpdateBoard,
        handleModalUpdateBoard,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
