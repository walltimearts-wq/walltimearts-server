const { MongoClient } = require('mongodb');

// EDIT THESE TWO LINES
const SOURCE_URI = "mongodb+srv://anisinbox10_db_user:A4gWzfUaL67XA0e8@cluster0.gdcx4st.mongodb.net/?appName=Cluster0/old-db";
const DEST_URI = "mongodb+srv://avenlybyhuma_db_user:zb1AqQNVtZfZ6dKn@cluster0.l7mvwbh.mongodb.net/?appName=Cluster0/new-db";

async function migrate() {
    const sourceClient = new MongoClient(SOURCE_URI);
    const destClient = new MongoClient(DEST_URI);

    try {
        await sourceClient.connect();
        await destClient.connect();
        console.log("Connected to both databases...");

        const sourceDb = sourceClient.db();
        const destDb = destClient.db();
        const collections = await sourceDb.listCollections().toArray();

        for (const collectionInfo of collections) {
            const name = collectionInfo.name;
            if (name.startsWith('system.')) continue; // Skip system collections

            console.log(`Migrating collection: ${name}...`);
            const data = await sourceDb.collection(name).find({}).toArray();

            if (data.length > 0) {
                await destDb.collection(name).deleteMany({}); // Optional: clear destination first
                await destDb.collection(name).insertMany(data);
                console.log(`Successfully moved ${data.length} documents.`);
            } else {
                console.log(`Collection ${name} is empty, skipping.`);
            }
        }

        console.log("\nMigration Complete! All data has been transferred.");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await sourceClient.close();
        await destClient.close();
    }
}

migrate();
