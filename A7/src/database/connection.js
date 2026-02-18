import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
export const db = client.db('testdb');
export const dbconnection =async ()=>
    {
        await client.connect()
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
    }