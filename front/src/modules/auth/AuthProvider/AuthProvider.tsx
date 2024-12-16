import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchWrap } from "../../common/fetch";
import { setToken } from "../common/token";
import { AuthContext } from "./const";
import { LoginResponse, User } from "./types";

type Props = {
  children: React.ReactNode;
};
type LoginFn = { email: string; password: string };
function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const login = useMutation({
    async mutationFn({ email, password }: LoginFn) {
      return fetchWrap("auth/", {
        body: { username: email, password },
      });
    },
    onSuccess(data: LoginResponse) {
      setToken(data.token);
      getUser.refetch();
    },
  });

  const getUser = useQuery(["user"], {
    queryFn() {
      return fetchWrap("user/");
    },
    onSuccess(data) {
      setUser(data);
    },
  });

  console.log({ user });

  if (getUser.isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" py={20} minWidth={400}>
        <CircularProgress size={70} />
      </Stack>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error: login.error?.toString() || null,
        loading: login.isLoading,
        login: login.mutateAsync,
        logout: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
