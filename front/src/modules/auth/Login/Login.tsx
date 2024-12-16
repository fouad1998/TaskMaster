import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import Card from "../../common/Card";
import CardContainer from "../../common/CardContainer";
import ForgotPassword from "./ForgotPassword";

import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { routes } from "../../common/routes";
import { useAuth } from "../AuthProvider";

function Login() {
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: {
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

  if (auth.user) {
    return <Navigate to={routes.home} replace />;
  }

  return (
    <CardContainer direction="column" justifyContent="space-between">
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
            auth.login(data);
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
            <FormLabel htmlFor="email">Username</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                validate(value) {
                  if (!value) {
                    return "Please enter a valid username.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  type="email"
                  placeholder="johndoe"
                  autoComplete="username"
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
                sx={{
                  alignSelf: "baseline",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
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
                href={routes.register}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </CardContainer>
  );
}

export default Login;
