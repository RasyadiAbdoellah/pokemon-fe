import type { Pokemon } from "pokenode-ts";
import { useApi, capitalize } from "lib";

type props = {
  pokemon: Pokemon;
  offerHandler?: Function;
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

const Details = ({ pokemon, offerHandler = () => {} }: props) => {
  return (
    <div>
      <div className="details">
        <img
          className="image"
          src={
            pokemon.sprites.other?.["official-artwork"].front_default ||
            undefined
          }
        />
        <h1>You've chosen {capitalize(pokemon?.name)}!</h1>
        <h2>Abilities</h2>
        <ul className="abilities">
          {pokemon.abilities.map((ability) => (
            <li>{ability.ability.name}</li>
          ))}
        </ul>
        <h2>Stats</h2>
        <ul className="stats">
          {pokemon.stats.map((statObj) => {
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
            <p>
              {
                pokemon.height *
                  10 /*height is in decimetre, convert to centimetre*/
              }
              cm
            </p>
          </div>
          <div>
            <p>Weight</p>
            <p>
              {
                pokemon.weight /
                  10 /*weight is in hectogram, convert to kilogram*/
              }
              kg
            </p>
          </div>
          <div>
            <p>ID</p>
            <p>{pokemon.id}</p>
          </div>
          <div>
            <p>Species</p>
            <p>{pokemon.species.name}</p>
          </div>
          <div>
            <p>Types</p>
            {pokemon.types.map((type) => (
              <span>{type.type.name} </span>
            ))}
          </div>
          <div>
            <p>Base Experience</p>
            <p>{pokemon.base_experience}</p>
          </div>
        </div>
        <button onClick={() => offerHandler()}>Make an Offer</button>
      </div>
    </div>
  );
};

export default Details;
