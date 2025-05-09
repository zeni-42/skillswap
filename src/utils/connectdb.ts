import mongoose from "mongoose";

type connectionObject= {
    isConnected?: number
};

const connection: connectionObject = {};
const DBNAME = "Skillswap"

async function CONNECTDB(): Promise<void> {
    if (connection.isConnected) {
        console.log("DB EXIST");
    }

    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
        connection.isConnected = database.connections[0].readyState;
        console.log("DB CONNECTED");
    } catch (error) {
        console.error("DB FAILED", error);
        process.exit(1);
    }
}

export default CONNECTDB;