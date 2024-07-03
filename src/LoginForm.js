import { useState } from 'react';
import Alert from './Alert';


/* PROPS
 *   - login()
 *
 * STATE
 *   - errorMessages: [ 'error message 1', ... ]
 *   - formData: { username, password }
 *
 * RoutesList -> (( LoginForm )) -> Alert */
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
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>

      {errorMessages.length > 0
        ? errorMessages.map((message, idx) =>
            <Alert key={idx} message={message.replace('instance.', '')} />)
        : null}
    </div>
  )
}

export default LoginForm;