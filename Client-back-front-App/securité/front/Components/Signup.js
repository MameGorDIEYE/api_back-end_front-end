import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const validationErrors = Validation(values);
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;
    if (isValid) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          console.log("Response from server:", res);
          navigate('/');
        })
        .catch(err => console.log("Error from server:", err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Création de Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Prenom">
              <strong>Prenom</strong>
            </label>
            <input
              type="text"
              placeholder="Votre Prénom"
              name="prenom"
              value={values.prenom}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.prenom && <span className="text-danger">{errors.prenom}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="Nom">
              <strong>Nom</strong>
            </label>
            <input
              type="text"
              placeholder="Votre Nom"
              name="nom"
              value={values.nom}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.nom && <span className="text-danger">{errors.nom}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
              autoComplete="email"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Votre mot de Passe</strong>
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control rounded-0"
              autoComplete="new-password"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm">
              <strong>Confirmer Le mot de passe</strong>
            </label>
            <input
              type="password"
              placeholder="Password Confirm"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleInput}
              className="form-control rounded-0"
              autoComplete="new-password"
            />
            {errors.passwordConfirm && (
              <span className="text-danger">{errors.passwordConfirm}</span>
            )}
          </div>
          <button type='submit' className="btn btn-success w-100 rounded-0">Créer Compte</button>
          <p>la page de connexion</p>
            <Link to="/" className="btn btn-primary border w-100 rounded-0 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
