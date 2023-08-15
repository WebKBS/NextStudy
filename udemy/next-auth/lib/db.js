import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_DB_URL);
  return client;
}
