import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return <Box py={4}>{children}</Box>;
}

export default Layout;
