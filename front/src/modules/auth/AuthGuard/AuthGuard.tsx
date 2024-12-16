import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../common/routes";
import { useAuth } from "../AuthProvider";

type Props = {
  children: React.ReactNode;
};
function AuthGuard({ children }: Props) {
  const location = useLocation();
  const auth = useAuth();
  const notRightPlace = ![routes.login, routes.register].includes(
    location.pathname
  );

  if (!auth.user && notRightPlace) {
    return <Navigate to={routes.login} replace />;
  }

  return <div>{children}</div>;
}

export default AuthGuard;
