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
  sort: object,
  filter = {}
) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}

// 가입된 이메일이 있는지 체크
export async function checkDuplicateEmail(
  client: any,
  collection: string,
  email: string
) {
  const db = client.db();
  const existingDocument = await db.collection(collection).findOne({ email });

  if (existingDocument) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }
}
