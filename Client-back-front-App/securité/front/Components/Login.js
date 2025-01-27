import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            navigate('/home');
          } else {
            alert("Cet Utilisateur n'existe pas, Il faut creer un compte");
          }
        })
        .catch(err => console.log(err, "Error from server:", err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Connexion</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger"> {errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger"> {errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>
          <p>la page de connexion</p>
          <Link to="/signup" className="btn btn-primary border w-100 rounded-0 text-decoration-none">
            Créer Compte
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
