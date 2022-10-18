import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
const url = "https://tabibi-backend.herokuapp.com/api/v1/region/governorat";

const Regions = () => {
  const [governorates, setGovernorates] = useState([]);
  const [governorateName, setGovernorateName] = useState("");
  const [message, setMessage] = useState("");

  const fetchGovernorates = async () => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    try {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    });
      const data = await response.json();
      const { governorates } = data;

      if (governorates) {
        const newGovernorates = governorates.map((governorate) => {
          const { _id: govid, governorateName } = governorate;
          return {
            govid,
            governorateName,
          };
        });
        setGovernorates(newGovernorates);
      } else {
        setGovernorates([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGovernorates();
  }, []);

  const addGovernorate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { governorateName });
      console.log(response);
      if (response.data) {
        fetchGovernorates();
        setGovernorateName("");
        setMessage(
          `la gouvernorat ${governorateName}</b> est ajoutée avec succès`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Regions</h1>
      <div>
        <h2>Gouvernorat</h2>
        <div>
          <h3>ajouter une gouvernorat</h3>
          <form onSubmit={addGovernorate}>
            <label htmlFor="gov">nom gouvernorat</label>
            <br />
            <input
              type="text"
              id="gov"
              placeholder="eg. monastir"
              value={governorateName}
              onChange={(e) => setGovernorateName(e.target.value)}
            />
            <button type="submit">ajouter</button>
            <br />
            <span>{message}</span>
          </form>
        </div>
        <br />
        <br />
        <br />
        <div>
          {governorates.map((governorate) => {
            const { govid, governorateName } = governorate;
            return (
              <ul key={govid}>
                <li>id:{govid}</li>
                {/* <Link to={`${govid}`}>
                  <li>nom:{governorateName}</li>
                </Link> */}
                <Link to={`${governorateName}/${govid}`}>
                  <li>nom:{governorateName}</li>
                </Link>
                <Link to={`update/${govid}/${governorateName}`}>
                  <AiFillEdit />
                </Link>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Regions;
