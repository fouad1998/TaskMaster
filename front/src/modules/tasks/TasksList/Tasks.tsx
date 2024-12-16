import ErrorLoading from "../../common/ErrorLoading";
import Layout from "../../common/Layout";
import LoadingTable from "./LoadingTable";
import TasksTable from "./TasksTable";

import { Add } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { fetchWrap } from "../../common/fetch";
import { routes } from "../../common/routes";
import type { Tasks as TasksType } from "../types";

function Tasks() {
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery<TasksType>(["tasks"], {
    queryFn() {
      return fetchWrap("tasks/");
    },
  });

  console.log({ tasks });

  return (
    <Layout>
      <Stack gap={isLoading ? 3 : 1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Tasks</Typography>
          <Stack direction="row" gap={1}>
            <Button LinkComponent={Link} href={routes.home} variant="outlined">
              Leadboard
            </Button>
            <Button
              startIcon={<Add />}
              LinkComponent={Link}
              href={routes.createTask}
              variant="contained"
              color="primary"
            >
              Add Task
            </Button>
          </Stack>
        </Stack>
        {isError ? (
          <Box py={5}>
            <ErrorLoading refetch={() => refetch()} />
          </Box>
        ) : isLoading ? (
          <LoadingTable />
        ) : (
          <TasksTable tasks={tasks!} />
        )}
      </Stack>
    </Layout>
  );
}

export default Tasks;
