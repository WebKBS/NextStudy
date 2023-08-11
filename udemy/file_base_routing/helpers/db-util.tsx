import { MongoClient } from "mongodb";
const url = process.env.MONGO_URI;

export async function connectToDatabase() {
  const client = await MongoClient.connect(url!);
  return client;
}

export async function insertDocument(
  client: any,
  collection: string,
  document: object
) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDcouments(
  client: any,
  collection: string,
  sort: object
) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
