import { capitalize, useApi } from "lib";
import type { NamedAPIResourceList } from "pokenode-ts";
import { useState } from "react";

import "./Dropdown.scss";

type props = {
  selectHandler: Function;
};

const Dropdown = ({ selectHandler }: props) => {
  //specify offset state to allow pagination if we have the time
  const [offset, setOffset] = useState(0);

  //do it this way instead of destructuring the entire return obj so we can specify the
  //expected type in the response and keep useApi generic
  const api = useApi(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
  const { loading, error } = api;
  const response: NamedAPIResourceList = api.response;

  return (
    <div className="dropdown">
      {loading && (
        <div className="dropdown__loading">Please wait. Loading Pokémon...</div>
      )}
      {response && !loading && !error && (
        <div className="dropdown__input">
          <label>Select a Pokémon for purchase:</label>
          <select onChange={(e) => selectHandler(e.target.value)}>
            <option value="">Select a Pokémon</option>
            {response.results?.map(({ name }) => (
              <option key={name} value={name}>
                {capitalize(name)}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && !loading && (
        <div className="error selector__error-message">
          {" "}
          Something went wrong! Please try refreshing the page
        </div>
      )}
    </div>
  );
};

export default Dropdown;
