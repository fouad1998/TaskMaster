import { Delete, Done, Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchWrap } from "../../common/fetch";
import { routes } from "../../common/routes";
import { Tasks } from "../types";

const headers = ["ID", "Title", "Description", "Status", "XP", "Actions"];

type Props = {
  tasks: Tasks;
};
function TasksTable({ tasks }: Props) {
  const navigate = useNavigate();
  const client = useQueryClient();

  const [alert, setAlert] = useState<{
    message: string;
    error: boolean;
  } | null>(null);

  const deleteTask = useMutation({
    async mutationFn(id: number) {
      return fetchWrap(`tasks/${id}/delete/`, {
        method: "DELETE",
      });
    },
    onSuccess(_, id) {
      setAlert({ message: `Task ${id} was deleted`, error: false });
      client.invalidateQueries("tasks");
    },
    onError(_, id) {
      setAlert({ message: `Task ${id} was not deleted`, error: true });
    },
  });

  const completeTask = useMutation({
    async mutationFn(id: number) {
      return fetchWrap(`tasks/${id}/complete/`, {
        method: "PATCH",
      });
    },
    onSuccess(_, id) {
      setAlert({ message: `Task ${id} was completed`, error: false });
      client.invalidateQueries("tasks");
      client.invalidateQueries(["user"]);
    },
    onError(_, id) {
      setAlert({ message: `Task ${id} was not completed`, error: true });
    },
  });

  function onEdit(id: number) {
    navigate(`/tasks/${id}`);
  }

  const disableActions = completeTask.isLoading || deleteTask.isLoading;

  if (!tasks.length) {
    return (
      <Stack gap={2} py={3} alignItems="center">
        <Alert severity="info" sx={{ width: "100%" }}>
          Empty list of tasks
        </Alert>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={routes.createTask}
        >
          Create new task
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap={1}>
      {alert && (
        <Alert severity={alert.error ? "error" : "success"}>
          {alert?.message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {task.completed ? "Completed" : "Not completed"}
                </TableCell>
                <TableCell>{task.points}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    <IconButton
                      disabled={task.completed || disableActions}
                      sx={{ color: "success.main" }}
                      onClick={() => completeTask.mutateAsync(task.id)}
                    >
                      <Done />
                    </IconButton>
                    <IconButton
                      disabled={task.completed || disableActions}
                      sx={{ color: "grey.600" }}
                      onClick={() => onEdit(task.id)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      disabled={task.completed || disableActions}
                      sx={{ color: "error.main" }}
                      onClick={() => deleteTask.mutateAsync(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default TasksTable;
