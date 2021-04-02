import React from "react";

const Filter = ({ newFilter, handleFilterChange }) => {
  return <input value={newFilter} onChange={handleFilterChange} />;
};

export default Filter;
