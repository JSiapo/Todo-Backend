require('dotenv').config();
export const PORT = parseInt(process.env.PORT || '3001');
export const NODE_ENV = process.env.NODE_ENV || 'test';