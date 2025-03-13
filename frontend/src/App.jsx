import React, { useContext } from "react";
import Login from "./Pages/Login";
import { AppContext } from "./Context/AppContext";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./Pages/EditProfile";

const App = () => {
  const { token } = useContext(AppContext);
  return (
    <div className="">
      <ToastContainer />
      {token ? <Dashboard /> : <Login />}
      <Routes>
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;
