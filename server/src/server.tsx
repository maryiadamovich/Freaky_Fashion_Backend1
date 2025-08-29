import express from "express";
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

const port = 8000;
const app: any = express();

//create database and wrap it in drizzle
const sqlite = new Database('./db/products.db', { verbose: console.log });
export const db = drizzle(sqlite as any);

//wrap table in drizzle
export const allProducts = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  photo: text('photo'),
  label: text('label'),
  sku: text('sku'),
  price: real('price').notNull(),
  kategori: text('kategori'),
});

//function to insert product into database with drizzle
const insertProduct = async (
  name: string,
  description: string,
  photo: string,
  label: string,
  sku: string,
  price: number,
  kategori: string,
) => {
  await db.insert(allProducts).values({
    name, description, photo, label, sku, price, kategori
  });
};

app.get("/api/products", async (req, res) => {
  try {

    const products = await db.select().from(allProducts).all();
    res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/products", express.json(), async (req, res) => {
  if (req.body.photo === "") {
    req.body.photo = "https://placehold.co/300x400/grey/white?text=" + req.body.name;

  }
  const { name, description, photo, label, sku, price, kategori } = req.body;

  try {

    await insertProduct(name, description, photo, label, sku, price, kategori);
    res.json({ message: "Product added" });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});