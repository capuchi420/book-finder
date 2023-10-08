import { bookModel } from "../model/db_model.js";

export const getAllBooks = async (req, res) => {
    try{
        const books = await bookModel.find();
        res.send(books);
    }catch(err){
        res.send(err);
    }
};