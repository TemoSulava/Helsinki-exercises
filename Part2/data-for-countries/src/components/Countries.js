import React from 'react';
import Country from './Country';

const Countries = ({ countries, filter, handleFilterUpdate }) => {
  const filterLength = filter.length;
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  
  

  if (filterLength === 0) {
    return (
      <div>nothing is defined yet</div>
    )
  }else if(filterLength === 1) {
    return (
      <div key={filtered[0].name}>
        <Country country={filtered[0]} />
      </div>
    )
  }else if(filterLength <= 10) {
    return (
      filtered.map(country =>
        <div key={country.name}>
          <span>{country.name}</span>
          <button value={country.name} onClick={handleFilterUpdate}>Show</button>
        </div>)
    )
  }else {
    return (
      null
    )
  }
};

export default Countries;