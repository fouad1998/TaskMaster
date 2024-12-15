import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchWrap } from "../../common/fetch";
import { AuthContext } from "./const";
import { User } from "./types";

type Props = {
  children: React.ReactNode;
};
type LoginFn = { email: string; password: string };
function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const login = useMutation({
    async mutationFn({ email, password }: LoginFn) {
      return fetchWrap("auth/", {
        body: { email, password },
      });
    },
    onSuccess(data, variables, context) {
      console.log("onSuccess", data, variables, context);
    },
  });

  const getUser = useQuery({
    queryFn() {
      return fetchWrap("user/");
    },
    onSuccess(data) {
      setUser(data);
    },
  });

  console.log({ user });

  if (getUser.isLoading || !user) {
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
