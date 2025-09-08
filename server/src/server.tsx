import express from "express";
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from './utils/jwt';

const port = 8000;
const app: any = express();

app.use(express.json());
//middleware for session


//create database and wrap it in drizzle
const sqlite = new Database('./db/products.db', { verbose: console.log });
export const db = drizzle(sqlite as any);

//wrap table products in drizzle
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

//wrap table users in drizzle
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

//wrap table favorites in drizzle
export const favorites = sqliteTable('favorites', {
  user_id: integer('user_id').notNull(),
  product_id: integer('product_id').notNull(),
});

//function to insert product into database products with drizzle
const insertProduct = async (
  name: string,
  description: string = "",
  photo: string = "",
  label: string = "",
  sku: string = "",
  price: number,
  kategori: string = "",
) => {
  await db.insert(allProducts).values({
    name, description, photo, label, sku, price, kategori
  });
};

//function to insert product into database users with drizzle
const insertUser = async (
  name: string,
  email: string,
  password: string,
) => {
  await db.insert(users).values({
    name, email, password
  });
};

//function to insert favorite into database favorites with drizzle
const insertFavorite = async (
  user_id: number,
  product_id: number,
) => {
  await db.insert(favorites).values({
    user_id, product_id
  });
};

app.get("/api/products", async (req, res) => {
  //console.log('Cookies received:', req.headers.cookie);
  //console.log('Session:', req.session);
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
  const {
    name,
    description = "",
    photo = "",
    label = "",
    sku = "",
    price,
    kategori = ""
  } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({
      error: "Missing required fields: name and price are required"
    });
  }

  try {
    await insertProduct(name, description, photo, label, sku, price, kategori);
    return res.json({ message: "Product added" });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/register", express.json(), async (req, res) => {

  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  //create hash of a password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //generate tokens
  const accessToken = generateAccessToken({name});
  const refreshToken = generateRefreshToken({name});

  //set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  
  try {
    await insertUser(name, email, hashedPassword);
    return res.json({ message: "User added", accessToken });

  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/login", express.json(), async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {

    //take user from database
    const userEmail = await db.select().from(users).where(eq(users.email, email)).all();

    if (userEmail.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    //compare password with the hash
    const isUser = await bcrypt.compare(password, userEmail[0].password);

    //take user data
    const user = {
      id: userEmail[0].id,
      name: userEmail[0].name,
      email: userEmail[0].email
    }

    //generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    if (isUser) {
      return res.json({ message: "User logged in", data: user, accessToken });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }

  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/favorites", express.json(), async (req, res) => {
  const { product_id, user_id } = req.body;
  console.log(product_id, user_id);

  try {

    
    await insertFavorite(user_id, product_id);
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({ error: "Server error" });
  }
  return res.json({ message: "Favorite added" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});