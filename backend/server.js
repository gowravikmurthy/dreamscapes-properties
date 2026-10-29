const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "dreamscape_properties1"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("MySQL Connected...");
});

// ✅ Signup API
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "User already exists or error occurred" });
        }
        res.status(201).json({ message: "Signup successful, please login" });
    });
});

// ✅ Signin API
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) { // Compare hashed passwords
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Signin successful", user });
    });
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
