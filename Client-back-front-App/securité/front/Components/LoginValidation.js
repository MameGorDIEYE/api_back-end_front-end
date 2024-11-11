function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (values.email === "") {
      error.email = "L'email ne doit pas être vide";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Adresse email Invalide";
    }else {
       error.email = ""
    }
  
    if (values.password === "") {
      error.password = "Mot de passe ne doit pas être vide";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Mot de passe Invalide";
    }else {
        error.password = ""
     }
    
  
    return error;
  }
  
  export default Validation;
  