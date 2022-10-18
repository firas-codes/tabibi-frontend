import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const url = "http://localhost:5000/api/v1/region/delegation";

const SingleGovernorate = () => {
  const { id, name } = useParams();
  const [delegName, setDelegName] = useState("");

  const [delegations, setDelegations] = useState([]);

  const [message, setMessage] = useState("");

  const fetchDelegations = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { delegations } = data;

      if (delegations) {
        const newDelegations = delegations.filter(
          (delegation) => delegation.governorateId === id
        );
        const filteredDelegations = newDelegations.map((delegation) => {
          const {
            _id: delegationId,
            delegationName,
            governorateId,
          } = delegation;
          return {
            delegationId,
            delegationName,
            governorateId,
          };
        });

        setDelegations(filteredDelegations);
      } else {
        setDelegations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDelegation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { delegName, id });
      if (response.data) {
        setDelegName("");
        fetchDelegations();
        setMessage(`la delegation ${delegName} est ajoutée avec succès`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDelegations();
  }, []);
  
  return (
    <div>
      <div>
        <h1>SingleGovernorate</h1>
        <h3>gov id :{id}</h3>
        <h3>gov name: {name}</h3>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3>ajouter delegation</h3>
        <form onSubmit={addDelegation}>
          <label htmlFor="deleg">nom delegation</label>
          <br />
          <input
            id="deleg"
            type="text"
            placeholder="eg. jemmel"
            value={delegName}
            onChange={(e) => setDelegName(e.target.value)}
          />{" "}
          <br />
          <button type="submit">ajouter</button>
          <br />
          <span>{message}</span>
        </form>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3>liste des delegations</h3>
        <div>
          {delegations.map((delegation) => {
            const { delegationId, delegationName } = delegation;
            return (
              <ul key={delegationId}>
                <li>delegation id : {delegationId}</li>
                <li>delegation name : {delegationName}</li>
              </ul>
            );
          })}
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default SingleGovernorate;
