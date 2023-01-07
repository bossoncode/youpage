import { createContext, FC, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/requests";

interface UserContext {
  username: string;
  email: string;
  token: string;
  isEmailVerified: boolean;
  displayName: string;
}

const UserContext = createContext<UserContext | null>(null);

const UserProvider = ({ children }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [token, setToken] = useState("");
  const [displayName, setDisplayName] = useState("");

  const getBasicInfo = () => {
    fetchData(
      "/profile/basic-info",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((data) => {
      setUsername(data.data.username);
      setEmail(data.data.email);
      setIsEmailVerified(data.data.isEmailVerified);
      setDisplayName(data.data.displayName);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("tkn");
    setToken(token as string);
  }, []);

  useEffect(() => {
    getBasicInfo();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ username, email, token, isEmailVerified, displayName }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser: any = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
