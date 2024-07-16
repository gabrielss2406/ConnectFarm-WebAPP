import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export { API_BASE_URL, API_KEY };