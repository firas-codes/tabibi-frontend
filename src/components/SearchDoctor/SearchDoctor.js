import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SearchDoctor = ({ governorates }) => {
  console.log(governorates);
  const url = "https://tabibi-backend.herokuapp.com/api/v1/region/delegation";
  const [selectedGov, setSelectedGov] = useState(null);
  const [govDelegations, setGovDelegations] = useState(null);

  const fetchDelegations = async () => {
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
      const { delegations } = data;

      if (delegations) {
        const newDelegations = delegations.filter(
          (delegation) => delegation.governorateId === selectedGov
        );
        setGovDelegations(newDelegations);
      } else {
        setGovDelegations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDelegations();
  }, [selectedGov]);
  return (
    <>
      <div className="banner-container" id="searchform">
        -----------------------------------------------------------------
        <div className="banner-image"></div>
        {/* content */}
        <div className="detail">
          <span>
            <span className="title">VOUS CHERCHEZ UN MEDECIN?</span>
            <p>
              <strong>C'est plus facile avec tabibi.tn</strong>
            </p>
            <div className="search-forms">
              {/* recherche par spécialité */}
              <input type="radio" name="tabs" id="tab1" defaultChecked />
              <label htmlFor="tab1">Recherche par specialités</label>

              <input type="radio" name="tabs" id="tab2" />
              <label htmlFor="tab2">J'ai déja mon médecin</label>

              <div id="tab-content1" className="tab content1">
                <form
                  id="doctorSearchForm1"
                  className="search-form f--search search-form--selected"
                  name="doctorSearchForm1"
                >
                  <div className="form-groups form-group__doc-speciality">
                    <div className="form-group f-blue-select">
                      <select
                        data-placeholder="Spécialité"
                        className="chosen-select-deselect"
                        tabIndex="-1"
                        name="searchCategory_text"
                        required=""
                      >
                        <optgroup value="0" label="">
                          <option value="8">Dentiste</option>
                          <option value="9">Ophtalmologiste</option>
                          <option value="10">Médecine Générale</option>
                          <option value="11">Gynécologue</option>
                          <option value="12">ORL</option>
                          <option value="13">Dermatologue</option>
                          <option value="14">Pédiatre</option>
                          <option value="15">physiotherapeute</option>
                          <option value="26">Cardiologue</option>
                          <option value="34">Gastro-entérologue</option>
                          <option value="35">psychiatre</option>
                          <option value="38">Chirurgien orthopédiste</option>
                          <option value="40">Cancérologue</option>
                          <option value="68">Orthophoniste</option>
                          <option value="70">Orthopédiste</option>
                          <option value="72">Radiologue</option>
                          <option value="74">Angiologue</option>
                          <option value="75">Orthodontiste</option>
                          <option value="76">Chirurgien Urologue</option>
                          <option value="77">Neurologue </option>
                          <option value="79">Hématologie</option>
                          <option value="81">Nutritionniste</option>
                          <option value="82">Pneumologie - Allergologie</option>
                          <option value="83">Chirurgie Générale</option>
                          <option value="84">Rhumatologue</option>
                        </optgroup>
                      </select>
                      <select
                        name="gouvernorat"
                        id="gouvernorat"
                        className="search__doc-speciality"
                        onChange={(e) => setSelectedGov(e.target.value)}
                      >
                        {governorates.map((governorates, index) => (
                          <option key={index} value={governorates.govid}>
                            {governorates.governorateName}
                          </option>
                        ))}
                        {console.log("selected gov", selectedGov)}
                        {console.log("selected govdelegation", govDelegations)}
                      </select>

                      <select
                        name="ville"
                        id="ville"
                        className="search__doc-speciality"
                      >
                        {selectedGov ? (
                          govDelegations?.map((delegation, index) => (
                            <option key={index} value={delegation._id}>
                              {delegation.delegationName}
                            </option>
                          ))
                        ) : (
                          <option value="Delegation">Delegation</option>
                        )}
                      </select>

                      <input
                        type="submit"
                        className="btn btn-validate"
                        value="Rechercher"
                        name="valider"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* j'ai déja un médecin */}

              <div id="tab-content2" className="tab content2">
                <form
                  className="search-form f--search search-form--selected"
                  id="searchDoctorByName"
                >
                  <input type="hidden" name="" />
                  <div className="form-groups">
                    <div className="form-group">
                      <input
                        type="text"
                        name="query"
                        id="query"
                        className="search__doc-praticien"
                        style={{ width: "100%" }}
                        placeholder="Recherchez votre médecin ou votre établissement"
                        list="searchpraticien"
                        required=""
                      />
                      <datalist id="searchpraticien"></datalist>
                    </div>
                  </div>
                  <div className="form-actions">
                    <input
                      type="submit"
                      className="btn btn-validate"
                      value="Rechercher"
                      name="rechercher"
                    />
                  </div>
                </form>
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default SearchDoctor;
