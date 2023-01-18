import type { Pokemon } from "pokenode-ts";
import { capitalize } from "lib";
import './Details.scss'
import { MouseEventHandler } from "react";

type props = {
  pokemon: Pokemon;
  offerHandler?: MouseEventHandler;
};

const formatString = (string: string) => {
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
        <div className="detail__body">
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
                <li key={ability.ability.name}>{formatString(ability.ability.name)}</li>
              ))}
            </ul>

            <h2>Stats</h2>

            <ul className="pill-group stats">
              {pokemon.stats.map((statObj) => {
                const statName = formatString(statObj.stat.name);
                return (
                  <li key={statName}>
                    {statName} <span>{statObj.base_stat}</span>
                  </li>
                );
              })}
            </ul>

            <div className="detail__more-info">

              <div className="info-group">
                <p className="info-group__heading">Height</p>
                <p>
                  {
                    pokemon.height *
                      10 /*height is in decimetre, convert to centimetre*/
                  }
                  cm
                </p>
              </div>

              <div className="info-group">
                <p className="info-group__heading">Weight</p>
                <p>
                  {
                    pokemon.weight /
                      10 /*weight is in hectogram, convert to kilogram*/
                  }
                  kg
                </p>
              </div>

              <div className="info-group">
                <p className="info-group__heading">ID</p>
                <p>{pokemon.id.toString().padStart(3, '0')}</p>
              </div>

              <div className="info-group">
                <p className="info-group__heading">Species</p>
                <p>{pokemon.species.name}</p>
              </div>

              <div className="info-group">
                <p className="info-group__heading">Types</p>
                <p>
                  {pokemon.types.map((type) => (
                    <span key={type.type.name}>{type.type.name} </span>
                  ))}
                </p>
              </div>

              <div className="info-group">
                <p className="info-group__heading">Base Experience</p>
                <p>{pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="detail__footer">
          <button onClick={offerHandler} className="btn btn-lg">Make an Offer</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
