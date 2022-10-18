import React, { useState } from "react";

import SearchDoctor from "../../components/SearchDoctor/SearchDoctor";
import OurDoctor from "../../components/OurDoctor/OurDoctor";
import Quote from "../../components/Quote/Quote";
import Help from "../../components/Help/Help";
import RecommondationDoc from "../../components/RecommondationDoc/RecommondationDoc";
import { useEffect } from "react";

const Home = () => {
  const url = "https://tabibi-backend.herokuapp.com/api/v1/region/governorat";
  const [governorates, setGovernorates] = useState([]);

  const fetchGovernorates = async () => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: headers,
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
  return (
    <div>
      <SearchDoctor governorates={governorates}/>
      <RecommondationDoc />
      <OurDoctor />
      <Quote />
      <Help />
    </div>
  );
};

export default Home;
