import React from "react";

const AddPeople = ({
  createPerson,
  handleChange,
  newNumber,
  handleNumberChange,
  newName,
}) => {
  return (
    <form onSubmit={createPerson}>
      <div>
        name: <input type='text' value={newName} onChange={handleChange} />
      </div>
      <div>
        number:{" "}
        <input type="number" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPeople;
