import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DurationPicker from "react-duration-picker";
import Card from "../../common/Card";
import CardContainer from "../../common/CardContainer";

import { Alert, Link, Slider, Stack, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { routes } from "../../common/routes";
import { TaskForm } from "../types";

type Props = {
  title: string;
  buttonTitle: string;
  initValues?: TaskForm;
  error?: string;
  disabled?: boolean;
  onSubmit(data: TaskForm): void;
};
function Form({
  title,
  buttonTitle,
  initValues,
  error,
  disabled,
  onSubmit,
}: Props) {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    values: initValues || {
      id: -1,
      title: "",
      description: "",
      duration: { hours: 1, minutes: 2, seconds: 3 },
      complexity: 4,
    },
  });

  return (
    <CardContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {title}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit(function (data) {
            onSubmit(data);
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
            <FormLabel htmlFor="title">Title</FormLabel>
            <Controller
              name="title"
              control={control}
              rules={{
                validate(value) {
                  if (!value) {
                    return "Please enter a valid title.";
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  id="title"
                  type="text"
                  placeholder="John"
                  autoComplete="firstname"
                  variant="outlined"
                  color={errors["title"] ? "error" : "primary"}
                  error={Boolean(errors["title"])}
                  helperText={errors["title"]?.message}
                  autoFocus
                  required
                  fullWidth
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  id="description"
                  placeholder="Ex: Do the laundry"
                  autoComplete="description"
                  color={errors["description"] ? "error" : "primary"}
                  minRows={4}
                  maxRows={12}
                  required
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="complexity">Complexity</FormLabel>
            <Controller
              name="complexity"
              control={control}
              render={({ field }) => (
                <Slider id="complexity" {...field} min={1} max={10} />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="duration">Duration</FormLabel>
            <DurationPicker
              maxHours={7}
              initialDuration={{ hours: 1, minutes: 2, seconds: 3 }}
              onChange={(value) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setValue("duration", value as any);
              }}
            />
          </FormControl>
          <Stack direction="row" gap={1}>
            <Button
              LinkComponent={Link}
              href={routes.tasks}
              variant="outlined"
              disabled={disabled}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={disabled}
              variant="contained"
              fullWidth
            >
              {buttonTitle}
            </Button>
          </Stack>
        </Box>
      </Card>
    </CardContainer>
  );
}

export default Form;
