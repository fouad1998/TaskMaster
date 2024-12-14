import { Route, Routes } from "react-router";
import Login from "./modules/auth/Login";
import Signup from "./modules/auth/Signup";
import PageLayout from "./modules/common/PageLayout";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/login" element={<Login />} />
        <Route index path="/" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
