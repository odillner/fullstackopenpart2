import React from 'react';

const SearchForm = (props) => {
  return (
    <div>
      <form>
        <div>
          find countries: <input value={props.value} onChange={props.onChange}/>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
