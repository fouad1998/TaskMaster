export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  xp: number;
  level: number;
};

export type AuthContext = {
  user: User | null;
  error: string | null;
  loading: boolean;
  login(cred: { email: string; password: string }): void;
  logout(): void;
};
