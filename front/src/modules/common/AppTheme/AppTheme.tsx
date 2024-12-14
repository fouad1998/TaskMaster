import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { dataDisplayCustomizations } from "./custom/dataDisplay";
import { feedbackCustomizations } from "./custom/feedback";
import { inputsCustomizations } from "./custom/inputs";
import { navigationCustomizations } from "./custom/navigation";
import { surfacesCustomizations } from "./custom/surfaces";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";

const theme = createTheme({
  // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
  typography,
  shadows,
  shape,
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
});

type AppThemeProps = {
  children: React.ReactNode;
};
function AppTheme({ children }: AppThemeProps) {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
