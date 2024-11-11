function Validation(values, action) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (action === "Sign Up") {
    if (values.prenom === "") {
      error.prenom = "Le prénom ne doit pas être vide";
    }

    if (values.nom === "") {
      error.nom = "Le nom ne doit pas être vide";
    }
  }

  if (values.email === "") {
    error.email = "L'email ne doit pas être vide";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Adresse email invalide";
  }

  if (values.password === "") {
    error.password = "Mot de passe ne doit pas être vide";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Mot de passe invalide";
  }

  if (action === "Sign Up") {
    if (values.passwordConfirm === "") {
      error.passwordConfirm = "Veuillez confirmer le mot de passe";
    } else if (values.passwordConfirm !== values.password) {
      error.passwordConfirm = "Les mots de passe ne correspondent pas";
    }
  }

  return error;
}

export default Validation;
