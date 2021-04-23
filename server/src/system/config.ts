import dotenv from 'dotenv';
dotenv.config();

const SERVER = {
  PORT: process.env.PORT || '3000',
};

export const config = {
  server: SERVER,
};