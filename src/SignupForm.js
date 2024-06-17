import { useState } from 'react';


/**
 * Props:
 *  - signup()
 *
 * State:
 * - errorMessages: [ 'error message', ... ]
 * - formData: { username, password, confirmPassword, firstName, lastName, email }
 *
 * RoutesList -> SignupForm
 */
function SignupForm({ signup }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {

    evt.preventDefault();
    const errors = [];
    const { password, confirmPassword, ...restOfFormData } = formData;

    if (password !== confirmPassword) {
      errors.push('Passwords do not match.');
      }

    if (password !== password.trim()) {
      errors.push('Password cannot start or end with whitespace.');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }
    try {
      await signup({ password, ...restOfFormData });
    } catch(err) {
      setErrorMessages(err);
    }
  }

  const formStyling = {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    margin: 'auto'
  };

  return(
    <div className="SignupForm">
      <form onSubmit={handleSubmit} style={formStyling}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          //TODO: Uncomment password type once testing is done.
          // type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          //TODO: Uncomment password type once testing is done.
          // type="password"
          id="confirm-password"
          name="confirmPassword"
          autoComplete="confirm-password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="First Name"
          autoComplete="first-name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          autoComplete="last-name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button>Sign Up</button>
        {
        errorMessages.length > 0
          ? errorMessages.map((errorMsg, idx) => <p key={idx}>{errorMsg}</p>)
          : null
        }
      </form>
    </div>
  )
}

export default SignupForm;