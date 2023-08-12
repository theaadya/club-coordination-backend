import * as mongoDB from "mongodb";

export const collections: { 
    users?: mongoDB.Collection, 
    events?: mongoDB.Collection, 
    clubs?: mongoDB.Collection 
} = {};

export async function connectToDatabase() {
    try {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://127.0.0.1:27017/clubcoord");
        await client.connect();
        
        const db: mongoDB.Db = client.db("clubcoord");
        
        const usersCollection: mongoDB.Collection = db.collection("users");
        const eventsCollection: mongoDB.Collection = db.collection("events");
        const clubsCollection: mongoDB.Collection = db.collection("clubs");
        
        collections.users = usersCollection;
        collections.events = eventsCollection;
        collections.clubs = clubsCollection;
        
        console.log(`Successfully connected to database: ${db.databaseName} and collections: ${usersCollection.collectionName}, ${eventsCollection.collectionName}, ${clubsCollection.collectionName}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}
