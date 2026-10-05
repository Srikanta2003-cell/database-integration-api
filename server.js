const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "User REST API is running"
    });
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch users"
            });
        }

        res.json(results);
    });
});

app.get("/users/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch user"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(results[0]);
    });
});

app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const sql = `
        INSERT INTO users (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to create user"
            });
        }

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });
    });
});

app.put("/users/:id", (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to update user"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully"
        });
    });
});

app.delete("/users/:id", (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to delete user"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});