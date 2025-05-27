import 'dotenv/config'; 
import { connectDB } from '../config/db.js';
import models from '../models/main.model.js';
import mongoose from 'mongoose';

async function sync() {
  await connectDB();

  for (const modelName in models) {
    await models[modelName].syncIndexes();
    console.log(`Synced indexes for ${modelName}`);
  }

  await mongoose.disconnect();
  console.log('Disconnected from DB');
  process.exit(0);
}

sync();
