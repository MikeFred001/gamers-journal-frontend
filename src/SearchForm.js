import { useState } from "react";

/* PROPS
 *  - searchGames()
 *
 * STATE
 *  - formData: { searchTerm }
 *
 * App -> RoutesList -> (( SearchForm )) */
function SearchForm({ searchGames }) {
  const [formData, setFormData] = useState({ searchTerm: '' });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.searchTerm.length > 0) searchGames(formData.searchTerm);
  }

  return (
    <div className="SearchForm">
      <form className="SearchForm-form" onSubmit={handleSubmit}>
        <input
          id="searchTerm"
          name="searchTerm"
          placeholder="Enter search term..."
          value={formData.searchTerm}
          onChange={handleChange}
        />
        <button className="SearchForm-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;