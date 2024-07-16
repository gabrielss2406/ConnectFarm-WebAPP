import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL!;
const API_KEY = process.env.API_KEY!;

export { API_BASE_URL, API_KEY };