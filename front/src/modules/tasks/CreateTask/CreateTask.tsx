import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchWrap } from "../../common/fetch";
import { routes } from "../../common/routes";
import Form from "../common/Form";
import type { TaskForm } from "../types";
import { convertFormTask } from "../utils";

function CreateTask() {
  const navigate = useNavigate();
  const create = useMutation({
    mutationFn(data: TaskForm) {
      return fetchWrap("tasks/dd", {
        method: "POST",
        body: convertFormTask(data),
      });
    },
    onSuccess() {
      navigate(routes.tasks);
    },
  });

  return (
    <Form
      title="Create Task"
      buttonTitle="Create"
      error={create.isError ? "An error occured during creation" : undefined}
      onSubmit={create.mutateAsync}
    />
  );
}

export default CreateTask;
