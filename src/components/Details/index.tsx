import type { Pokemon } from "pokenode-ts";
import { useApi, capitalize } from "lib";

type props = {
  pokemon?: string;
};

const formatStatName = (string: string) => {
  let formattedString;
  if (string.length === 2) {
    formattedString = string.toUpperCase();
  } else if (string.includes("-")) {
    formattedString = string.split("-");
    formattedString = `${capitalize(formattedString[0])} ${capitalize(
      formattedString[1]
    )}`;
  } else {
    formattedString = capitalize(string);
  }
  return formattedString;
};

const Details = ({ pokemon }: props) => {
  if (!pokemon) {
    return <p>Select a pokemon from the dropdown above</p>;
  }

  const api = useApi(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  const { loading, error } = api;
  const response: Pokemon = api.response;

  return (
    <div>
      {loading && <p>loading...</p>}
      {!loading && response && (
        <div className="details">
          <img
            className="image"
            src={
              response.sprites.other?.["official-artwork"].front_default ||
              undefined
            }
          />
          <h1>You've chosen {capitalize(response?.name)}!</h1>
          <h2>Abilities</h2>
          <ul className="abilities">
            {response.abilities.map((ability) => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
          <h2>Stats</h2>
          <ul className="stats">
            {response.stats.map((statObj) => {
              const statName = formatStatName(statObj.stat.name);
              return (
                <li>
                  {statName} <span>{statObj.base_stat}</span>
                </li>
              );
            })}
          </ul>
          <div className="info">
            <div>
              <p>Height</p>
              <p>{response.height * 10 /*height is in decimetre, convert to centimetre*/}cm</p>
            </div>
            <div>
              <p>Weight</p>
              <p>{response.weight / 10 /*weight is in hectogram, convert to kilogram*/}kg</p>
            </div>
            <div>
              <p>ID</p>
              <p>{response.id}</p>
            </div>
            <div>
              <p>Species</p>
              <p>{response.species.name}</p>
            </div>
            <div>
              <p>Types</p>
              {response.types.map((type) => (
                <span>{type.type.name} </span>
              ))}
            </div>
            <div>
              <p>Base Experience</p>
              <p>{response.base_experience}</p>
            </div>
          </div>
          <button>Make an Offer</button>
        </div>
      )}
    </div>
  );
};

export default Details;
