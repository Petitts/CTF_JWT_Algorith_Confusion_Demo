const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Klucze
const privateKey = fs.readFileSync('private.pem');
// Usuwamy nagłówki, by biblioteka 8.5.1 nie blokowała HS256
const publicKey = fs.readFileSync('public.pem', 'utf8')
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '');

// Logowanie
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Prosta autoryzacja
    if (username === 'user' && password === 'password') {
        const payload = { user: username, admin: false };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        
        res.cookie('auth_token', token, { httpOnly: false, path: '/' }); 
        return res.json({ success: true });
    }
    res.status(401).json({ error: "Błędne dane" });
});

// Podatny Endpoint
app.get('/api/admin', (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).send("Brak tokenu!");

    try {
        // Podatność: ufa algorytmowi z nagłówka
        const decoded = jwt.verify(token, publicKey);
        
        if (decoded.admin === true) {
            res.send("<h1>BINGO! Witaj w panelu administratora.</h1><br><h3>flag{181181ed8376d304f13d43d3e9f9adfa542467d1}</h3>");
        } else {
            res.send(`Witaj ${decoded.user}. Nie masz uprawnień admina.`);
        }
    } catch (err) {
        res.status(401).send("Błąd: " + err.message);
    }
});

app.listen(3000, () => console.log('Demo działa na http://localhost:3000'));
