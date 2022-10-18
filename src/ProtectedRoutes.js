import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logout } from "./redux/userSlice";


const ProtectedRoutes = () => {

  const user = useSelector((State)=>State.user.user);

  console.log('user from protected route',user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return user ? (
    <>
      <button className="btn-dash" onClick={()=>navigate('/')}>home</button>
      <br />
      <button className="btn-dash" onClick={()=>handleLogout()}>logout</button>
      <h1>bonjour {user.name}</h1>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
