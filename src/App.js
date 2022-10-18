import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import SharedLayout from "./pages/SharedLayout";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./components/Dashboard/Users";
import Projects from "./components/Dashboard/Projects";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./pages/Register";
import Regions from "./components/Dashboard/Regions";
import SingleGovernorate from "./components/Dashboard/SingleGovernorate";
import UpdateGovernorate from "./components/Dashboard/UpdateGovernorate";

function App() {
  const user = useSelector((State) => State.user.user);
  console.log("user from app", user);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="regions" element={<Regions />} />
          {/* <Route path="regions/:id" element={<SingleGovernorate />} /> */}
          <Route path="regions/:name/:id" element={<SingleGovernorate />} />
          <Route path="regions/update/:id/:name" element={<UpdateGovernorate />} />
        </Route>
      </Route>
      <Route path="*" element={<Error/>}/>
    </Routes>
  );
}

export default App;
