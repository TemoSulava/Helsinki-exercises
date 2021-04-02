import React from "react";

//This function conditionally displays the contact list, depending what is inputed into the search bar.

const ContactList = ({ filterLength, filterName, displayNames }) => {
  return (
    <>
      {filterLength > 0 ? (
        <ul className="filtered-list">
          {filterName.map(p => (
            <li key={p.id}>
              {p.name} <span>{p.number}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-style">{displayNames}</ul>
      )}
    </>
  );
};

export default ContactList;
