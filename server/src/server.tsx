import express from "express";
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from './utils/jwt';
import cookieParser from 'cookie-parser';

const port = 8000;
const app: any = express();

app.use(express.json());
//middleware for cookies
app.use(cookieParser());

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

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  if (email) {
    const user = await db.select().from(users).where(eq(users.email, email)).all();
    if (user.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
  }

  //create hash of a password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //generate tokens
  const accessToken = generateAccessToken({ name });
  const refreshToken = generateRefreshToken({ name });

  //set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  try {
    await insertUser(name, email, hashedPassword);
    //take user from database
    const userEmail = await db.select().from(users).where(eq(users.email, email)).all();
    //take user data
    const user = {
      id: userEmail[0].id,
      name: userEmail[0].name,
      email: userEmail[0].email
    }
    return res.json({ message: "User added", data: user, accessToken });

  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/login", express.json(), async (req, res) => {

  const { email, password } = req.body;
  let accessToken = req.headers.authorization.split(' ')[1];//remove Bearer
  let refreshToken = req.cookies.refreshToken;

  //if I don't have actuall tokens I generate new ones
  if (!accessToken || !refreshToken) {
    if (email) {
      const user = await db.select().from(users).where(eq(users.email, email)).all();
      if (user.length > 0) {
        const isUser = await bcrypt.compare(password, user[0].password);
        if (isUser) {
          accessToken = generateAccessToken(user[0]);//generate new accesstoken
          refreshToken = generateRefreshToken(user[0]);//generate new refreshtoken
        }
      }
    }
    //set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    const userEmail = await db.select().from(users).where(eq(users.email, email)).all();
    //take user data
    const user = {
      id: userEmail[0].id,
      name: userEmail[0].name,
      email: userEmail[0].email
    }

    return res.json({ message: "User logged in", accessToken, refreshToken, data: user });
  }
  //if I have actuall tokens I verify them
  let isTokenValid = false;
  try {
    const userVerifiedToken = verifyAccessToken(accessToken);//verify acesstoken
    let userVerifiedRefreshToken;
    if (userVerifiedToken) {
      isTokenValid = true;
    } else {
      userVerifiedRefreshToken = verifyRefreshToken(refreshToken); //verify refreshtoken
      if (userVerifiedRefreshToken) {
        accessToken = generateAccessToken(userVerifiedToken);//generate new accesstoken
        isTokenValid = true;
      }
    }
    if (!userVerifiedToken && !userVerifiedRefreshToken) {
      accessToken = generateAccessToken(userVerifiedToken);//generate new accesstoken
      refreshToken = generateRefreshToken(userVerifiedToken);//generate new refreshtoken
      isTokenValid = true;
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    //take user from database
    const userEmail = await db.select().from(users).where(eq(users.email, email)).all();

    if (userEmail.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    try {
      //compare password with the hash
      const isUser = await bcrypt.compare(password, userEmail[0].password);
      if (isUser) {
        return res.json({ message: "User logged in", accessToken });
      }
    } catch (error) {
      return res.status(401).json({ error: "Invalid password" });
    }

  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/favorites", express.json(), async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    await insertFavorite(user_id, product_id);
  } catch (error) {
    console.error("Error adding favorite:", error);

    if (error.code === 'SQLITE_CONSTRAINT' || error.message?.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: "This product is already in your favorites" });
    }
    return res.status(500).json({ error: "Server error" });
  }

  return res.json({ message: "Favorite added" });
});

app.get("/api/favorites", async (req, res) => {
  const user_id = req.query.user_id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  const tokenUser = token.split(' ')[1];//remove Bearer
  let isTokenValid = false;
  try {
    const userVerifiedToken = verifyAccessToken(tokenUser);
    if (userVerifiedToken) {
      isTokenValid = true;
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  try {
    const userFavorites = await db.select().from(favorites).where(eq(favorites.user_id, parseInt(user_id)));
    // If no favorites found for the user
    if (userFavorites.length === 0) {
      return res.status(404).json({ message: "No favorites found for this user" });
    }
    const favoriteProducts = [];
    for (const favorite of userFavorites) {
      const product = await db.select().from(allProducts).where(eq(allProducts.id, favorite.product_id)).all();
      if (product.length > 0) {
        favoriteProducts.push(product[0]);
      }
    }
    return res.status(200).json(favoriteProducts);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
//delete refresh token
app.post('/api/logout', (req, res) => {
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  // clear session
  //req.session = null;
  res.status(200).send({ message: 'Logout successful' });
});

app.post('/api/auth/refresh', (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ error: "No refresh token" });
  }
  try {
    const user = verifyRefreshToken(token);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});





app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});