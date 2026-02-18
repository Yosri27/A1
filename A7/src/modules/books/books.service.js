import { bookModel } from './../../database/models/books.js';




export const indexTitle = async () =>
{
    let data = await bookModel.createIndex({title: 1});
    return data;
} 

export const addBook = async (title, author, year, geners) =>
    {
        let data = await bookModel.insertOne({title, author, year, geners});
        return data;
    }

export const addBooks = async (books) =>
    {
        let data = await bookModel.insertMany(books);
        return data;
    }    

export const UpdateBook = async (title, author, year, geners) =>
    {
        let data = await bookModel.updateOne({title}, {$set: {author, year, geners}});
        return data;
    }

export const findByTitle = async (title) =>
    {
        let data = await bookModel.findOne({title});
        return data;
    }


export const findByYear = async () =>
    {
        let data = await bookModel.find({year:{$gte:"1990",$lte:"2010"}}).toArray();
        return data;
    } 
export const findBygenre = async (genre) =>
    {
        let data = await bookModel.find({geners : genre}).toArray();
        return data;
    }    

export const findByYearInt = async (type) => {

    let data = await bookModel.find({year: type}).toArray();
    return data;
}    


export const findByGenreExclude = async (type) => {

    let data = await bookModel.find({geners: {$ne: type}}).toArray();
    return data;
}

export const deleteByYear = async (year) => {
    let data = await bookModel.deleteMany({year: {$lt: year}});
    return data;
}

export const aggregate1 = async () => {
    let data = await bookModel.aggregate([
  { $match: { year: { $gt: 2000 } } },
  { $sort: { year: -1 } }
])
}

export const aggregate2 = async () => {
    let data = await bookModel.aggregate([
  { $match: { year: { $gt: 2000 } } },
  { $project: { _id: 0, title: 1, author: 1, year: 1 } }
])
}

