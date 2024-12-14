import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "../common/Card";
import Container from "../common/Container";

import { Controller, useForm } from "react-hook-form";

function Signup() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  return (
    <Container direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
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
            <FormLabel htmlFor="firstname">Firstname</FormLabel>
            <Controller
              name="firstname"
              control={control}
              rules={{
                validate(value) {
                  if (!value || value.length < 6) {
                    return "Please enter a valid firstname.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  id="firstname"
                  type="text"
                  placeholder="John"
                  autoComplete="firstname"
                  variant="outlined"
                  color={errors["firstname"] ? "error" : "primary"}
                  error={Boolean(errors["firstname"])}
                  helperText={errors["firstname"]?.message}
                  autoFocus
                  required
                  fullWidth
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastname">Lastname</FormLabel>
            <Controller
              name="lastname"
              control={control}
              rules={{
                validate(value) {
                  if (!value || value.length < 6) {
                    return "Please enter a valid lastname.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  autoComplete="lastname"
                  variant="outlined"
                  color={errors["lastname"] ? "error" : "primary"}
                  error={Boolean(errors["lastname"])}
                  helperText={errors["lastname"]?.message}
                  autoFocus
                  required
                  fullWidth
                  {...field}
                />
              )}
            />
          </FormControl>
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
            <FormLabel htmlFor="password">Password</FormLabel>
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
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            I have an account?{" "}
            <span>
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default Signup;
