import { useApi } from "lib";
import type { NamedAPIResourceList } from "pokenode-ts";
import { useState } from "react";

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
    <div>
      {loading && <div>Please wait. Loading Pokemon...</div>}
      {response && !loading && (
        <select onChange={(e) => selectHandler(e.target.value)}>
            <option value="">Select a pokemon</option>
          {response.results?.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      )}
      {error && !loading && (
        <div> Something went wrong! Please try refreshing the page</div>
      )}
    </div>
  );
};

export default Dropdown;
