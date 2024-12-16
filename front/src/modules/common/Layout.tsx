import { Container } from "@mui/material";

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {children}
    </Container>
  );
}

export default Layout;
