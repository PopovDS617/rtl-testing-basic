import React, { useState } from 'react';
import validator from 'validator';

const App = () => {
  const [signUpInput, setSignUpInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const inputHandler = (event) =>
    setSignUpInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const clickHandler = (event) => {
    event.preventDefault();
    if (!validator.isEmail(signUpInput.email)) {
      setError('the email is invalid');
    } else if (signUpInput.password.length < 5) {
      setError('the password is too short');
    } else if (signUpInput.confirmPassword !== signUpInput.password) {
      setError('passwords are not equal');
    }
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signUpInput.email}
            className="form-control"
            onChange={inputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            value={signUpInput.password}
            onChange={inputHandler}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={signUpInput.confirmPassword}
            onChange={inputHandler}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={clickHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
