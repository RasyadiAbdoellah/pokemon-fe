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
      <div className="detail">
        <img
          className="detail__image"
          src={
            pokemon.sprites.other?.["official-artwork"].front_default ||
            undefined
          }
        />
        <div className="detail__content">

          <h1>You've chosen {capitalize(pokemon?.name)}!</h1>

          <h2>Abilities</h2>

          <ul className="pill-group abilities">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>

          <h2>Stats</h2>

          <ul className="pill-group stats">
            {pokemon.stats.map((statObj) => {
              const statName = formatStatName(statObj.stat.name);
              return (
                <li key={statName}>
                  {statName} <span>{statObj.base_stat}</span>
                </li>
              );
            })}
          </ul>

          <div className="detail__more-info">

            <div className="info-group">
              <p>Height</p>
              <p>
                {
                  pokemon.height *
                    10 /*height is in decimetre, convert to centimetre*/
                }
                cm
              </p>
            </div>

            <div className="info-group">
              <p>Weight</p>
              <p>
                {
                  pokemon.weight /
                    10 /*weight is in hectogram, convert to kilogram*/
                }
                kg
              </p>
            </div>

            <div className="info-group">
              <p>ID</p>
              <p>{pokemon.id}</p>
            </div>

            <div className="info-group">
              <p>Species</p>
              <p>{pokemon.species.name}</p>
            </div>

            <div className="info-group">
              <p>Types</p>
              {pokemon.types.map((type) => (
                <span key={type.type.name}>{type.type.name} </span>
              ))}
            </div>

            <div className="info-group">
              <p>Base Experience</p>
              <p>{pokemon.base_experience}</p>
            </div>
          </div>
        </div>
        
        <div className="detail__footer">
          <button onClick={() => offerHandler()}>Make an Offer</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
