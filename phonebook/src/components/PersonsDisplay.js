import React from 'react';

const PersonsDisplay = (props) => {
    const filter = (person) => {
      if (props.filter === "" ||
          person.name.toLowerCase().includes(props.filter.toLowerCase())) 
      {
        return (
            <div key={person.name}>
                <p>
                    {person.name} {person.number}
                    <button onClick={props.removeHandler(person)}>delete</button>
                </p>
            </div>
        )
      } else {
        return
      }
    }
  
    return (
      <div>
        {props.persons.map(person => filter(person))}
      </div>
    )
}

export default PersonsDisplay;