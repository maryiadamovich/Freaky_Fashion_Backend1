import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

//secret key for jwt
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_secret_access_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_secret_refresh_key';


//data about user
interface Payload {
    name: string;
}

//generation of tokens
export function generateAccessToken(payload: Payload): string {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: Payload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

//verification of the takens
export function verifyAccessToken(token: string): Payload {
    return jwt.verify(token, JWT_ACCESS_SECRET) as Payload;
}

export function verifyRefreshToken(token: string): Payload {
    return jwt.verify(token, JWT_REFRESH_SECRET) as Payload;
}