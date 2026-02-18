import { db } from "../connection.js";



export const bookModel = db.collection('books',
    {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: {bsonType: "string"},

                }
            }
        }
    });
    