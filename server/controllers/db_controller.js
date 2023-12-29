import { bookModel } from "../model/db_model.js";

export const getAllBooks = async (req, res) => {
    try{
        const books = await bookModel.find();
        return res.json(books);
    }catch(err){
        return res.json(err);
    }
};

export const getABook = async (req, res) => {
    try{
        const id = req.params._id;
        const book = await bookModel.findById(id);
        return res.json(book);
    }catch(err){
        return res.json(err)
    }
}