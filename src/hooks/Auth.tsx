import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  user: object;
  signOut():void
}
interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@gobarber:token");
    const user = localStorage.getItem("@gobarber:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@gobarber:token", token);
    localStorage.setItem("@gobarber:user", JSON.stringify(user));

    setData({ token, user });

  }, []);

  const signOut = useCallback(() =>{
  localStorage.removeitem("@gobarber:token");
  localStorage.removeitem("@gobarber:user");
  setData({} as AuthState)
},[]);
  return (
    <AuthContext.Provider value={{ name: "Igor", signIn, user: data.user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ():AuthContextData =>{

  const context = useContext(AuthContext)

  if(!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
