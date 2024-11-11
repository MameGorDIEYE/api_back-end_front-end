import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Inscription.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import firstname_icon from '../Assets/firstname.png';
import Validation from './InscriptionValidation';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const Inscription = () => {
    const [action, setAction] = useState("Sign Up");
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
        const validationErrors = Validation(values, action);
        setErrors(validationErrors);
        const isValid = Object.keys(validationErrors).length === 0;

        if (isValid) {
            const url = action === "Sign Up" ? 'http://localhost:8081/signup' : 'http://localhost:8081/login';
            axios.post(url, values)
                .then(res => {
                    if (action === "Sign Up") {
                        setAction("Login"); 
                        setValues({ email: '', password: '' });
                    } else {
                        if (res.data.success) {
                            localStorage.setItem('authenticated', 'true'); // Storing authentication
                            navigate('/api'); // Redirect to /api after successful login
                        } else {
                            setErrors({ login: res.data.message }); 
                        }
                    }
                })
                .catch(err => {
                    console.log("Error from server:", err);
                    if (action === "Login") {
                        setErrors({ login: "Erreur de connexion" });
                    } else {
                        setErrors({ signup: "Erreur d'inscription" });
                    }
                });
        }
    };

    const handleActionChange = (newAction) => {
        setAction(newAction);
        setValues({ prenom: '', nom: '', email: '', password: '', passwordConfirm: '' });
        setErrors({});
    };

    return (
        <div> 
            <Header/>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        {action === "Login" ? (
                            <>
                                <div className="input">
                                    <img src={email_icon} alt="" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                        autoComplete="email"
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="input">
                                    <img src={password_icon} alt="" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                        autoComplete="current-password"
                                    />
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                                {errors.login && <span className="text-danger">{errors.login}</span>}
                            </>
                        ) : (
                            <>
                                <div className="input">
                                    <img src={firstname_icon} alt="" />
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        name="prenom"
                                        value={values.prenom}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                    />
                                    {errors.prenom && <span className="text-danger">{errors.prenom}</span>}
                                </div>
                                <div className="input">
                                    <img src={user_icon} alt="" />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        name="nom"
                                        value={values.nom}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                    />
                                    {errors.nom && <span className="text-danger">{errors.nom}</span>}
                                </div>
                                <div className="input">
                                    <img src={email_icon} alt="" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                        autoComplete="email"
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="input">
                                    <img src={password_icon} alt="" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                        autoComplete="new-password"
                                    />
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                                <div className="input">
                                    <img src={password_icon} alt="" />
                                    <input
                                        type="password"
                                        placeholder="Password Confirm"
                                        name="passwordConfirm"
                                        value={values.passwordConfirm}
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                        autoComplete="new-password"
                                    />
                                    {errors.passwordConfirm && <span className="text-danger">{errors.passwordConfirm}</span>}
                                </div>
                            </>
                        )}
                    </div>
                    {action === "Sign Up" ? (
                        <div></div>
                    ) : (
                        <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
                    )}
                    <div className="submit-container">
                        <button type="submit" className="submit"><h4>Envoyer</h4></button>
                    </div>
                </form>
                <div className="submit-container">
                    <button type="button" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => handleActionChange("Sign Up")}>Sign Up</button>
                    <button type="button" className={action === "Login" ? "submit gray" : "submit"} onClick={() => handleActionChange("Login")}>Login</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Inscription;
