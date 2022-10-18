import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const url = "http://localhost:5000/api/v1/auth/register";
const options = [
  {
    label:"Patient",
    value:'patient'
  },
  {
    label:"Docteur",
    value:'doctor'
  },

]
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status,setStatus] = useState('patient');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(url,{name,email,password,status});
        console.log(response.data);
        const user = await response.data.user;
        console.log(user);
        dispatch(login(user));
        navigate('/dashboard');
        return true;
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <section>
      <h2>Register form</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
        <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="email">email:</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="password">password:</label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <label htmlFor="statut">statut:</label>
        <select name="statut" id="statut" onChange={(e)=>setStatus(e.target.value)}>
          {options.map((option,index)=>
            <option key={index} value={option.value}>{option.label}</option>
          )}
        </select>
        <hr />
        <button type='submit' className="btn">register</button>
      </form>
    </section>
  );
};

export default Register;
