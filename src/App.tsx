import { Route, Routes } from "react-router";
import Login from "./modules/auth/Login";
import PageLayout from "./modules/common/PageLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
