import { db } from "../../database/connection.js";

export const addLog = async (message) =>
    {
        let data = await db.collection('logs').insertOne({message});
        return data;
    }