import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

async function serverConfigHandler() {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    const dbConnectionResult = await mongoose.connect(connectionString);
    console.log(`backend mongoDB altas is connected at ${dbConnectionResult.connection.host}`);
    app.listen(process.env.PORT, function () {
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

export { serverConfigHandler, app };
