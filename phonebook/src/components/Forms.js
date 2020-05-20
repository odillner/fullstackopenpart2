import React from 'react';

const InputForm = (props) => {
    const {nameInput, handleNameForm} = props.nameForm;
    const {numberInput, handleNumberForm} = props.numberForm;
  
    return (
      <div>
        <form>
          <div>
            name: <input value={nameInput} onChange={handleNameForm}/>
          </div>
          <div>
            number: <input value={numberInput} onChange={handleNumberForm}/>
          </div>
          <div>
            <button type="submit" onClick={props.addPerson}>add</button>
          </div>
        </form>
      </div>
    )
}
  
const SearchForm = (props) => {
    const {searchInput, handleSearchForm} = props.searchForm;
  
    return (
      <div>
        <form>
          <div>
            filter: <input value={searchInput} onChange={handleSearchForm}/>
          </div>
        </form>
      </div>
    )
}
  

export default {
    InputForm,
    SearchForm
};

