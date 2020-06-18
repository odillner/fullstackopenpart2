import React, { useState, useEffect } from 'react';
import Forms from './components/Forms';
import PersonsDisplay from './components/PersonsDisplay';
import Notification from './components/Notification';

import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("notification");

  useEffect(() => {
    getAllPersons()
  }, []);


  const getAllPersons = () => {
    personService
    .getAll()
    .then(response => {
      setPersons(response);
    });
  }
  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {name: nameInput, number: numberInput};
    const foundPerson = persons.find(person => (person.name === newPerson.name));

    if (foundPerson) {
      updatePerson(foundPerson._id, newPerson);
    } else {    
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNameInput('');
          setNumberInput('');

          displayMessage(`${newPerson.name} has been added`, "notification")
        });
    }
  }

  const updatePerson = (id, newPerson) => {
    if (window.confirm(`${newPerson.name} already exists, update with new number?`)) {
      personService
        .update(id, newPerson)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id).concat(response));
          setNameInput('');
          setNumberInput('');

          displayMessage(`${newPerson.name} has been updated`, "notification")
        });
    }
  }

  const handleNameForm = (event) => {
    setNameInput(event.target.value);
  }

  const handleNumberForm = (event) => {
    setNumberInput(event.target.value);
  }

  const handleSearchForm = (event) => {
    setSearchInput(event.target.value);
  }

  const handleRemoveButton = (person) => {
    const handler = () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
          .remove(person._id)
          .then(response => {
            displayMessage(`${person.name} has been deleted`, "notification")
            getAllPersons()
          })
          .catch(error => {
            displayMessage(`${person.name} has already been deleted`, "error")
          });
      }
    }

    return handler;
  }

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {setMessage(null)}, 5000)
  }

  return (
    <div>
      <Notification message={message} type={messageType}/>
      <h2>Phonebook</h2>
      <Forms.SearchForm
        searchForm={{searchInput, handleSearchForm}}
      />

      <h2>add new</h2>
      <Forms.InputForm 
        nameForm={{nameInput, handleNameForm}} 
        numberForm={{numberInput, handleNumberForm}} 
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <PersonsDisplay removeHandler={handleRemoveButton} persons={persons} filter={searchInput}/>
    </div>
  )
}

export default App;