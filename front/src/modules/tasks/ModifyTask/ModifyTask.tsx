import ErrorLoading from "../../common/ErrorLoading";
import Form from "../common/Form";

import { Box, CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWrap } from "../../common/fetch";
import { routes } from "../../common/routes";
import type { Task, TaskForm } from "../types";
import { convertFormTask } from "../utils";

function ModifyTask() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const client = useQueryClient();
  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useQuery<Task>(["tasks", params.id], {
    queryFn() {
      return fetchWrap(`tasks/${params.id}/`);
    },
  });

  const modify = useMutation({
    mutationFn(data: TaskForm) {
      return fetchWrap(`tasks/${data.id}/update/`, {
        method: "PATCH",
        body: convertFormTask(data),
      });
    },
    onSuccess() {
      navigate(routes.tasks, { replace: true });
      client.invalidateQueries("tasks");
    },
  });

  if (isError) {
    return (
      <Box py={5}>
        <ErrorLoading refetch={() => refetch()} />
      </Box>
    );
  }

  if (isLoading || !task) {
    return (
      <Box py={10}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Form
      title="Modify Task"
      buttonTitle="Modify"
      error={
        modify.isError ? "An error occured during modification" : undefined
      }
      initValues={{
        id: task!.id,
        title: task!.title,
        description: task!.description,
        complexity: task!.complexity,
        duration: {
          hours: Math.floor(task!.duration / 3600),
          minutes: Math.floor((task!.duration % 3600) / 60),
          seconds: task!.duration % 60,
        },
      }}
      onSubmit={modify.mutateAsync}
    />
  );
}

export default ModifyTask;
