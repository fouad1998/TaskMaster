import AuthProvider from "./modules/auth/AuthProvider";
import Login from "./modules/auth/Login";
import Signup from "./modules/auth/Signup";
import PageLayout from "./modules/common/PageLayout";
import LeaderBoard from "./modules/leaderboard";
import CreateTask from "./modules/tasks/CreateTask";
import TasksList from "./modules/tasks/TasksList";

import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./modules/common/routes";
import ModifyTask from "./modules/tasks/ModifyTask";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Signup />} />
            <Route path={routes.home} element={<LeaderBoard />} />
            <Route path={routes.tasks} element={<TasksList />} />
            <Route path={routes.createTask} element={<CreateTask />} />
            <Route path={routes.modifyTask} element={<ModifyTask />} />
            <Route path="/" element={<Navigate to={routes.login} replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
