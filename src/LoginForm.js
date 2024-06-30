import { useState } from 'react';


/* Props:
 *   - login()
 *
 * State:
 *   - errorMessages: [ 'error message 1', ... ]
 *   - formData: { username, password }
 *
 * App -> RoutesList -> (( LoginForm )) */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessages, setErrorMessages] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
    } catch(err) {
      setErrorMessages(err);
    }
  }

  return(
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Login</button>
        {/* TODO: Handle form alerts */}
      </form>
    </div>
  )
}

export default LoginForm;