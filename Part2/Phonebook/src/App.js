import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import AddPeople from "./AddPeople";
import ContactList from "./ContactList";
import contactServices from './services/ContactDatabase';
import Notification from './Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState('User addition status... pending...')
  const [textStyle, setTextStyle] = useState({
    color: "grey",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  });
 
  const successMessage = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorMessage = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  //fetch contacts from the local database
  useEffect(() => {
    contactServices
      .getAll()
      .then(returnedInfo => setPersons(returnedInfo))
  }, [])

  //See if the search input includes the newFilter
  const filterName = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  //check if the input is empty or has symbols filled in
  const filterLength = newFilter.length;

  //Entire phonebook list with names and numbers
  const displayNames = persons.map(person => (
    <li key={person.id}>
      {person.name} 
      <span>{person.number}</span>
      <span><button onClick={() => removeContact(person.id)}>Delete</button></span>
    </li>
  ));

  //Remove an item from the list and display the rest of the items on the screen, by using the filter method.
  const removeContact = (id) => {
    contactServices
      .remove(id)
      .then((returnedPersons) =>
        setPersons(persons.filter((person) => person.id !== id))
      )
      .catch((error) => {
        setMessage(`The user ${newName} has already been deleted`);
        setTextStyle(errorMessage);
      });
  };

  //adds a new entity to the list
  const createPerson = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, would you like to edit the number?`
        )
      ) {
        const oldObject = persons.find((person) => person.name === newName);
        const personsObject = {
          name: oldObject.name,
          number: newNumber,
        };
      }
    } else {
      const personsObject = {
        name: newName,
        number: newNumber,
      };
      
      contactServices
        .create(personsObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));

        setTimeout(() => {
          setMessage(`User ${newName} has been successfully added to the list`)
          setTextStyle(successMessage);
        }, 0)
        setTimeout(() => {
          setMessage('User addition status... pending...')
        }, 5000)
    }
    //check if the the new contact already exists in the phonebook
    //reset fields after submition
    setNewName("");
    setNewNumber("");
  };

  //eventListener for controlling the name input
  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  //controlling the number input
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  //controlling the search input
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  
 

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification style={textStyle} message={message} />
      <div>
        <h2>
          Search by name
          <span>
            <Filter
              newFilter={newFilter}
              handleFilterChange={handleFilterChange}
            />
          </span>
        </h2>
      </div>
      <h3>Add people</h3>
      <AddPeople
        createPerson={createPerson}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        newName={newName}
      />
      <h2>Numbers</h2>
      <ContactList
        filterLength={filterLength}
        displayNames={displayNames}
        filterName={filterName}
      />
    </div>
  );
};

export default App;
