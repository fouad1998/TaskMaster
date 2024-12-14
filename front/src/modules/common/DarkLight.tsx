import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import {
  FormControlLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import React from "react";
import { Fragment } from "react/jsx-runtime";

function DarkLight(props: RadioGroupProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isDark = mode !== "system" ? mode === "dark" : systemMode === "dark";

  return (
    <Fragment>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        {isDark ? <NightlightIcon /> : <LightModeIcon />}
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <RadioGroup
          {...props}
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as "system" | "light" | "dark")
          }
          sx={{
            p: 1,
            px: 2,
          }}
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </Popover>
    </Fragment>
  );
}

export default DarkLight;
