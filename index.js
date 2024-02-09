import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // mysql username
    password: process.env.DATABASE_PASSWORD, // mysql password
    database: 'crud' //name of your database/schema
})

//CREATE Operation
app.post('/', (req, res) => {
    const q = "INSERT INTO product (`name`, `category`, `description`, `price`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.price,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Data has been inserted successfully.")
    });

});

//READ Operation
app.get('/', (req, res) => {
    const q = "SELECT * FROM product";

    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

//UPDATE Operation
app.put('/', (req, res) => {
    const productID = req.body.id;
    const q = "UPDATE product SET `name` = ?,  `category` = ?, `description` = ?, `price` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.price
    ];

    console.log(req.body.id);

    db.query(q, [...values, productID], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

//DELETE Operation
app.delete("/:id", (req, res) => {
    const productID = req.params.id;
    const q = "DELETE FROM product WHERE id = ?";

    db.query(q, [productID], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    });
});

// Listening server on port 8800
app.listen(PORT, () => {
    console.log("Server is running successfully.");
});