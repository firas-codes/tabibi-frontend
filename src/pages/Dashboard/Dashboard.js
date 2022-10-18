import React from "react";
import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
  
  
  return(
    <main>
      <Sidebar />
      <Outlet/>
    </main>
  )
};

export default Dashboard;
