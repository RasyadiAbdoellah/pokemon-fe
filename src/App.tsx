import { useApi } from "lib";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";

import 'styles/global.scss'
import logo from 'assets/page-logo.svg'

import Details from "components/Details";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";

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

    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

  }, [selectedPokemon, showModal]);


  return (
    <div className="App">
      <img className="logo" src={logo} />
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
