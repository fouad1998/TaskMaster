import { Box, Stack } from "@mui/material";

function Stars() {
  return (
    <Stack direction="row" justifyContent="center" gap={4} overflow="hidden">
      <Box
        component="img"
        src="/bronze_star.png"
        sx={{
          width: 70,
          transform:
            "perspective(400px) rotate3d(0, 1, 0, -30deg) translateZ(-30px)",
        }}
      />

      <Box
        component="img"
        src="/gold_star.png"
        sx={{
          width: 70,
          transform:
            "perspective(400px) rotate3d(0, 1, 0, 0deg) translateZ(0px)",
        }}
      />

      <Box
        component="img"
        src="/silver_star.png"
        sx={{
          width: 70,
          transform:
            "perspective(400px) rotate3d(0, 1, 0, 30deg) translateZ(-30px)",
        }}
      />
    </Stack>
  );
}

export default Stars;
