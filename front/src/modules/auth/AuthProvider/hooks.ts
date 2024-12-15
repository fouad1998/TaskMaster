import { useContext } from "react";
import { AuthContext } from "./const";

export function useAuth() {
  return useContext(AuthContext);
}
