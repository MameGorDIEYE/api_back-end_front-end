function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (values.prenom === "") {
      error.prenom = "Le prenom ne doit pas être vide";
    }else {
      error.prenom = ""
   }
  
    if (values.nom === "") {
      error.nom = "Le nom ne doit pas être vide";
    }else {
      error.nom = ""
   }
  
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
  
    if (values.passwordConfirm === "") {
      error.passwordConfirm = "Veuillez confirmer le mot de passe";
    } else if (values.passwordConfirm !== values.password) {
      error.passwordConfirm = "Les mots de passe ne correspondent pas";
    }else {
      error.passwordConfirm = ""
   }
  
    return error;
  }
  
  export default Validation;
  