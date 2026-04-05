import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "../types";

interface UserContextType {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: "Jacob Zero",
    handle: "@jacobzero",
    joined: "March 2024",
    expertStatus: "none",
    ads: [
      {
        id: "sa1",
        type: "skill",
        title: "Professional Tutoring",
        author: "Jacob Zero",
        description: "I teach Python and React Native for beginners. 5 years experience.",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80",
        status: "approved",
      },
    ],
    requests: [
      {
        id: "sr1",
        type: "request",
        title: "Need help with a logo",
        author: "Jacob Zero",
        description: "Looking for a minimal logo for a startup. Budget $200.",
        price: "$200",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80",
        status: "approved",
      },
    ],
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
