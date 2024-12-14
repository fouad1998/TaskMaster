import BackArrowIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Stack } from "@mui/material";
import { Outlet } from "react-router";
import DarkLight from "./DarkLight";

function PageLayout() {
  return (
    <Box
      sx={{
        p: 2,
        minWidth: 520,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton>
          <BackArrowIcon />
        </IconButton>
        <Box component="img" src="logo.png" width={40} />
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
