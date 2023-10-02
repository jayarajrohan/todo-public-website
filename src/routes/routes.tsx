import { Route, Routes } from "react-router-dom";
import Login from "../components/login/login";
import SignUp from "../components/sign-up/sign-up";
import Todo from "../components/todo/todo";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Todo />} path="/" />
      <Route element={<SignUp />} path="/sign-up" />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default AppRoutes;
