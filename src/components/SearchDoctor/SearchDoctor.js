import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SearchDoctor = ({ governorates }) => {
  console.log(governorates);
  const url = "https://tabibi-backend.herokuapp.com/api/v1/region/delegation";
  const [selectedGov, setSelectedGov] = useState(null);
  const [selectedDel, setSelectedDel] = useState(null);
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

  const searchDoctor = async (e) => {
    e.preventDefault();
    console.log("selectedGov", selectedGov);
    console.log("selectedDel", selectedDel);
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
              {/* recherche par sp??cialit?? */}
              <input type="radio" name="tabs" id="tab1" defaultChecked />
              <label htmlFor="tab1">Recherche par specialit??s</label>

              <input type="radio" name="tabs" id="tab2" />
              <label htmlFor="tab2">J'ai d??ja mon m??decin</label>

              <div id="tab-content1" className="tab content1">
                <form
                  id="doctorSearchForm1"
                  className="search-form f--search search-form--selected"
                  name="doctorSearchForm1"
                  onSubmit={searchDoctor}
                >
                  <div className="form-groups form-group__doc-speciality">
                    <div className="form-group f-blue-select">
                      <select
                        data-placeholder="Sp??cialit??"
                        className="chosen-select-deselect"
                        tabIndex="-1"
                        name="searchCategory_text"
                        required=""
                      >
                        <option value="specialite">--Sp??cialit??--</option>
                      </select>
                      <select
                        name="gouvernorat"
                        id="gouvernorat"
                        className="search__doc-speciality"
                        onChange={(e) => setSelectedGov(e.target.value)}
                      >
                        <option value="gouvernorat">--Gouvernorat--</option>
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
                        onChange={(e) => setSelectedDel(e.target.value)}
                      >
                        <option value="Delegation">--D??l??gation--</option>
                        {govDelegations?.map((delegation, index) => (
                          <option key={index} value={delegation._id}>
                            {delegation.delegationName}
                          </option>
                        ))}
                      </select>

                      <button type="submit">rechercher</button>
                    </div>
                  </div>
                </form>
              </div>

              {/* j'ai d??ja un m??decin */}

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
                        placeholder="Recherchez votre m??decin ou votre ??tablissement"
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
