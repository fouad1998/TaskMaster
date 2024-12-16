import { Button, Stack, Typography } from "@mui/material";

type Props = {
  refetch?(): void;
};
function ErrorLoading({ refetch }: Props) {
  return (
    <Stack gap={3} alignItems="center">
      <Typography variant="h4" align="center">
        Error Loading
      </Typography>

      <Typography variant="body1" align="center">
        Something went wrong. Please try again later.
      </Typography>

      <Button variant="outlined" onClick={refetch}>
        Retry
      </Button>
    </Stack>
  );
}

export default ErrorLoading;
