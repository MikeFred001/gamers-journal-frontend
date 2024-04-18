import { useState } from "react";

/** Renders search form
 *
 * Props:
 *  - filterList(): callback function to GamesList
 *
 * State:
 *  - formData like { searchTerm }
 *  -- searchTerm is key and always a string
 *
 * { GamesList } -> SearchForm */

function SearchForm({ filterList }) {
  const [formData, setFormData] = useState({ searchTerm: "" });

  /** Handles updating search form when user types */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Handles sending search term to callback function */
  function handleSubmit(evt) {
    evt.preventDefault();

    // if no search term is provided, don't search again
    if (formData.searchTerm.length > 0) filterList(formData.searchTerm);

    setFormData({ searchTerm: "" });
  }

  return (
    <div className="SearchForm">
      <form className="SearchForm-form" onSubmit={ handleSubmit }>
        <label htmlFor="searchTerm"></label>
        <input
          id="searchTerm"
          name="searchTerm"
          value={ formData.searchTerm }
          onChange={ handleChange }
          placeholder="Enter search term ..."
        />
        <button className="SearchForm-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;