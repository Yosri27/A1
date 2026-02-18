import { db } from "../connection.js";



export const authorModel = db.collection('authors').insertOne({

    name:"author1",
    nationality:"british",
});
    