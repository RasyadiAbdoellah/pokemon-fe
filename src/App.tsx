import Details from "components/Details";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";
import { useApi } from "lib";
import { Pokemon } from "pokenode-ts";
import { useCallback, useEffect, useMemo, useState } from "react";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [showModal, setShowModal] = useState(false);

  const api = useApi(
    `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`,
    undefined,
    false
  );
  //@ts-ignore
  const thePokemon: Pokemon = api.response;

  useEffect(() => {
    if (selectedPokemon !== "") {
      api.triggerFetch();
    }
  }, [selectedPokemon]);

  console.log(thePokemon);

  return (
    <div className="App">
      <Dropdown selectHandler={setSelectedPokemon} />
      {thePokemon && (
        <Details pokemon={thePokemon} offerHandler={() => setShowModal(true)} />
      )}
      {showModal && (
        <Modal pokemon={thePokemon} closeHandler={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
