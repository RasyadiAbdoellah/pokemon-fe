import { MouseEventHandler, useState } from "react";
import { capitalize, useApi } from "lib";
import { Pokemon } from "pokenode-ts";

import "./Modal.scss";

type props = {
  pokemon: Pokemon;
  closeHandler?: MouseEventHandler;
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
    <div className="overlay" onClick={closeHandler}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__heading">
          <h1>Offer details</h1>
          <button
            className="btn btn-sm btn-close"
            onClick={closeHandler}
            aria-label="close modal"
          >
            X
          </button>
        </div>
        <div className="modal__body">
          <p>
            Placing an offer on: <strong>{capitalize(pokemon.name)}</strong>
          </p>
          <form
            id="modal-form"
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
            <div className="input-group">
              <div className="input-group-inner">
                <label>Amount (CAD): </label>
                <input
                  className="input input-number"
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
              </div>
              {!!inputError && (
                <p className="error input-error">{inputError}</p>
              )}
            </div>
          </form>
        </div>
        <div className="modal__footer">
          <input
            form="modal-form"
            className="input input-submit btn"
            type="submit"
            disabled={!!inputError || !input}
            aria-label="submit offer"
            value={`${loading ? "Submitting..." : "Submit offer"}`}
          />
          {error && (
            <p className="error modal__error">
              Sorry! Unable to process the transaction
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
