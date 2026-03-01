import {MongoClient} from  'mongodb'; 
import dotenv from 'dotenv';
dotenv.config();
//const url = "mongodb+srv://ankushar143_db_user:L35M8rcCxUKczGTB@cluster0.jerq9na.mongodb.net/";
//const url = "mongodb://localhost:27017/"
//const url = "mongodb+srv://ankushar143_db_user:L35M8rcCxUKczGTB@cluster0.jerq9na.mongodb.net/?appName=Cluster0"
const url = process.env.MONGO_URI;
export const db = "Node-js"; 
export  const collectionName = "Todo";

export async function connectToMongo() {
    const connect = await MongoClient.connect(url);
    const database = connect.db(db);
  
    console.log("Connected to MongoDB");
      return database;
}

connectToMongo().catch(console.error);