const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

// La methode post pour l'inscription
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users_table (`prenom`, `nom`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.prenom,
        req.body.nom,
        req.body.email,
        req.body.password
    ];
    console.log('Received signup request with values:', values); // Log the received values
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the error
            return res.status(500).json("Error");
        }
        console.log('Data inserted successfully:', data); // Log the success
        return res.json(data);
    });
});

// Methode POST pour connexion
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users_table WHERE `email`= ? AND `password` = ?";
    console.log('Received login request with values:', req.body); // Log the received values
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error querying data:', err); // Log the error
            return res.status(500).json({ success: false, message: "Erreur de connexion au serveur" });
        }
        if (data.length > 0) {
            return res.json({ success: true, message: "Connexion réussie" });
        } else {
            return res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
