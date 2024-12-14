import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import Card from "../common/Card";
import Container from "../common/Container";
import ForgotPassword from "./ForgotPassword";

import { Controller, useForm } from "react-hook-form";

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
              <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
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
