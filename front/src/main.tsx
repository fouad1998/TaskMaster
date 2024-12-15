import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App.tsx";
import AppTheme from "./modules/common/AppTheme";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <MemoryRouter
        // basename="/taskmaster"
        // initialEntries={["/taskmaster/login"]}
        >
          <App />
        </MemoryRouter>
      </AppTheme>
    </StyledEngineProvider>
  </StrictMode>
);
