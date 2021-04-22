import dotenv from 'dotenv';
dotenv.config();

const SERVER = {
  PORT: process.env.PORT || '3000',
};

const config = {
  server: SERVER,
};

export default config;