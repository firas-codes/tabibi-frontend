import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";

// const url = "http://localhost:5000/api/v1/auth/login";
const prodUrl = "https://tabibi-backend.herokuapp.com/api/v1/auth/login";

const Login = () => {
  const isLoggedin = useSelector((state)=>state.user.isLoggedIn);
  // console.log('isLoggedIn from login ',isLoggedin);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) return;

    const response = await axios.post(prodUrl, { email, password });
    const userData = await response.data;

    console.log('user data from login',userData);

    const {user,token:userToken} = userData;
    
    console.log('userProp from login',user);
    console.log('userToken from login',userToken);

    if (!user) {
      navigate('/');
    } else {
      dispatch(login(user));

      navigate('/dashboard');
    }
  };

  if (isLoggedin ){
    return <Navigate to='/dashboard'/>;
  }
  return  (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <h5>login</h5>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block">
          login
        </button>
      </form>
      <h3>no account ? register here</h3>
      <NavLink to='/register'>register</NavLink>
    </section>
  );
};
export default Login;
