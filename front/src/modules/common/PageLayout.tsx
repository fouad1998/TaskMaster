import BackArrowIcon from "@mui/icons-material/ArrowBack";
import DarkLight from "./DarkLight";

import { Box, IconButton, Stack } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes";

function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasBack = ![routes.login, routes.register].includes(location.pathname);

  return (
    <Box
      sx={{
        p: 2,
        minWidth: 600,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span>
          {hasBack && (
            <IconButton onClick={() => navigate(-1)}>
              <BackArrowIcon />
            </IconButton>
          )}
        </span>

        <Box component="img" src="logo.png" width={60} />
        <span>
          <DarkLight />
        </span>
      </Stack>
      <main>
        <Outlet />
      </main>
    </Box>
  );
}

export default PageLayout;
