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


  const getAllPersons = async () => {
    try {
      const res = await personService.getAll()
      setPersons(res)
    } catch (err) {
      displayError(`Could not fetch phonebook`)
      console.log(err)
    }
  }

  const addPerson = async (event) => {
    event.preventDefault();

    const newPerson = {name: nameInput, number: numberInput};
    const foundPerson = persons.find(person => (person.name === newPerson.name));

    if (foundPerson) {
      updatePerson(foundPerson.id, newPerson);
    } else {    
      try {
        const res = await personService.create(newPerson)

        setPersons(persons.concat(res))

        displayMessage(`${newPerson.name} has been added`)
      } catch (err) {
        displayError(`Unable to add person, invalid input`)
        console.log(err)
      }

      setNameInput('');
      setNumberInput('');
    }
  }

  const updatePerson = async (id, newPerson) => {
    if (window.confirm(`${newPerson.name} already exists, update with new number?`)) {
      try {
        const res = await personService.update(id, newPerson)

        setPersons(persons.filter(p => p.id !== id).concat(res));

        displayMessage(`${newPerson.name} has been updated`)
      } catch (err) {
        displayError(`Unable to update person, invalid input`)
        console.log(err)
      }

      setNameInput('');
      setNumberInput('');
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
    const handler = async () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        try {
          const res = await personService.remove(person.id)

          displayMessage(`${person.name} has been deleted`)
        } catch (err) {
          displayError(`${person.name} has already been deleted`)
          console.log(err)
        }

        setPersons(persons.filter(p => p.id !== person.id));
      }
    }

    return handler;
  }

  const displayMessage = (message) => {
    setMessage(message);
    setMessageType("notification");
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const displayError = (error) => {
    setMessage(error);
    setMessageType("error");
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