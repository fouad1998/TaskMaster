import { Add } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import ErrorLoading from "../common/ErrorLoading";
import { fetchWrap } from "../common/fetch";
import Layout from "../common/Layout";

function Tasks() {
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery(["tasks"], {
    queryFn() {
      return fetchWrap("tasks/");
    },
  });

  return (
    <Layout>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Tasks</Typography>
          <Button startIcon={<Add />} variant="contained" color="primary">
            Add Task
          </Button>
        </Stack>
        {isError ? (
          <ErrorLoading refetch={() => refetch()} />
        ) : isLoading ? (
          <Stack alignItems="center" p={3}>
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        )}
      </Stack>
    </Layout>
  );
}

export default Tasks;
