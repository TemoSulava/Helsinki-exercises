import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>
        <span>{country.name}</span>
      </h1>
      <p>
        capital {country.capital}
        <br />
        Population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>
            {language.name}
            <br />
          </li>
        ))}
      </ul>
      <p>
        <img
          src={country.flag}
          alt={`flag of ${country.name}`}
          height="50"
          width="50"
        />
      </p>
    </div>
  );
};

export default Country;
