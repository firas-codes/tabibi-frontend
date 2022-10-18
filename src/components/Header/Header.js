import React from "react";
import "./header.css";
import { Link} from "react-router-dom";
import LOGO from "../../assets/logo-tabibi.png";
import { AiOutlineMail } from "react-icons/ai";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <header className="container">
      <div className="top-bar">
        <ul>
          <li>
            {/* <img src="../images/tuns_logo.gif" alt="" /> */}
          </li>
          <li>
            <a href="mailto:contact@tabibi.tn">
              <AiOutlineMail className="header-icon" />
              contact@tabibi.tn
            </a>
          </li>
        </ul>
      </div>
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <img src={LOGO} alt="" />
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
