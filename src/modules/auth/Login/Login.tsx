import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import ForgotPassword from "./ForgotPassword";

import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import Container from "../common/Container";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

function Login() {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(function (data) {
            console.log(data);
          })}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                validate(value) {
                  if (!value || !/\S+@\S+\.\S+/.test(value)) {
                    return "Please enter a valid email address.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  variant="outlined"
                  color={errors["email"] ? "error" : "primary"}
                  error={Boolean(errors["email"])}
                  helperText={errors["email"]?.message}
                  autoFocus
                  required
                  fullWidth
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Controller
              name="password"
              control={control}
              rules={{
                validate(value) {
                  if (!value || value.length < 6) {
                    return "Password must be at least 6 characters long.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  type="password"
                  id="password"
                  variant="outlined"
                  placeholder="••••••"
                  autoComplete="current-password"
                  color={errors["password"] ? "error" : "primary"}
                  error={Boolean(errors["password"])}
                  helperText={errors["password"]?.message}
                  autoFocus
                  required
                  fullWidth
                  {...field}
                />
              )}
            />
          </FormControl>
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
