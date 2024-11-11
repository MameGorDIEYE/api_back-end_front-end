const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

// Clé secrète pour signer le token
const JWT_SECRET = "votre_clé_secrète";

// La méthode post pour l'inscription
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users_table (`prenom`, `nom`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.prenom,
        req.body.nom,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json("Error");
        }
        return res.json(data);
    });
});

// Méthode POST pour connexion
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users_table WHERE `email`= ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ success: false, message: "Erreur de connexion au serveur" });
        }
        if (data.length > 0) {
            // Crée un token JWT avec une durée de validité de 1 heure
            const token = jwt.sign({ userId: data[0].id }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, message: "Connexion réussie", token: token });
        } else {
            return res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }
    });
});

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalide" });
        
        req.user = user; // Sauvegarde les infos de l'utilisateur
        next();
    });
};

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Vous avez accès aux données protégées" });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
