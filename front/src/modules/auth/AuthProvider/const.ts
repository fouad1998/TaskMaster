import { createContext } from "react";
import { AuthContext as AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  loading: false,
  login: () => {},
  logout: () => {},
});
