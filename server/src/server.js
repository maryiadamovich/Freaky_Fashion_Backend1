import express from "express";
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

const port = 8000;
const app = express();

const sqlite = new Database('./db/products.db', { verbose: console.log });
export const db = drizzle(sqlite);

export const allProducts = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  photo: text('photo'),
  label: text('label'),
  sku: text('sku'),
  price: real('price').notNull(),
});

app.get("/api/products", async (req, res) => {
  try {

    const products = await db.select().from(allProducts).all();
    res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
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