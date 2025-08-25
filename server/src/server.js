import express from "express";
import Database from 'better-sqlite3';
const db = new Database('./db/products.db', { verbose: console.log });

const port = 8000;
const app = express();

app.get("/api/products", (req, res) => {

  const products = db.prepare(`
    SELECT id,
           name,
           description,
           photo,
           label,
           sku,
           price
    FROM products
    `).all();

  res.json(products);
});

app.post("/api/products", express.json(), (req, res) => {
  if (req.body.photo === "") {
    req.body.photo = "https://placehold.co/300x400/grey/white?text=" + req.body.name;

  }
  const { name, description, photo, label, sku, price } = req.body;
  
  const insert = db.prepare(`
    INSERT INTO products (name, description, photo, label, sku, price)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insert.run(name, description, photo, label, sku, price);
  res.json({ message: "Product added" });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });