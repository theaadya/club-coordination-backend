import * as mongoDB from "mongodb";

export const collections: { games?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    try {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost:27017/gamesDB");
        await client.connect();
        
        const db: mongoDB.Db = client.db("gamesDB");
        const gamesCollection: mongoDB.Collection = db.collection("games");
        
        collections.games = gamesCollection;
        
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}
