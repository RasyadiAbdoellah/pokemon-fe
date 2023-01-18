import { useState } from "react";
import { capitalize, useApi } from "lib";
import { Pokemon } from "pokenode-ts";

type props = {
  pokemon: Pokemon;
  closeHandler?: Function;
};

const Modal = ({ pokemon, closeHandler = () => {} }: props) => {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState<boolean | string>(false);

  const reqBody = {
    PokemonId: pokemon.id,
    CashValue: input,
  };

  const { loading, response, error, triggerFetch } = useApi(
    "https://api.monstercat.com/pokemon",
    { method: "post", body: JSON.stringify(reqBody) },
    false
  );

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__heading">
          <h2>Offer details</h2>
          <button
            onClick={() => {
              closeHandler();
            }}
            aria-label="close modal"
          >
            X
          </button>
        </div>
        <div className="modal__body">
          
        </div>
        <p>Placing an offer on:</p>
        <h3>{capitalize(pokemon.name)}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // the required flag on the input should prevent ever needing this
            // but still good practice to set it up IMO.
            if (input.match(/\D/g)) {
              setInputError("Value must be a number!");
            } else if (input === "") {
              setInputError("Field can't be empty");
            } else {
              triggerFetch();
            }
          }}
        >
          <p>Please enter a cash amount below</p>
          <div>
            <label>Offer (CAD): </label>
            <input
              className="input-number"
              value={input}
              required
              onChange={(e) => {
                let value = e.target.value;
                if (!!value.match(/\D/g) && value !== "") {
                  setInputError("Value must be a number!");
                } else {
                  setInputError(false);
                }
                setInput(value);
              }}
            />
            {!!inputError && <p className="error input-error">{inputError}</p>}
          </div>
          <input
            className="input-submit"
            type="submit"
            disabled={!!inputError}
          ></input>
        </form>
        {error && (
          <p className="error modal__error">Uh oh! Unable to process the transaction</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
