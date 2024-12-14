import { Stack, StackProps } from "@mui/material";
import React from "react";

type Props = StackProps & {
  children: React.ReactNode;
};
function Container({ children, ...props }: Props) {
  return (
    <Stack
      {...props}
      sx={(theme) => ({
        p: 2,
        minHeight: "100%",
        "&::before": {
          content: '""',
          display: "block",
          position: "absolute",
          zIndex: -1,
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
          backgroundRepeat: "no-repeat",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
          }),
        },
      })}
    >
      {children}
    </Stack>
  );
}

export default Container;
