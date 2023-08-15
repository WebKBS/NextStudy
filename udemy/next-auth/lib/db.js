import { MongoClient } from "mongodb";

export async function connetToDatabase() {
  const client = new MongoClient(process.env.MONGO_DB_URL);
  return client;
}
