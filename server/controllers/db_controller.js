import { bookModel } from "../model/db_model.js";

export const getAllBooks = async (req, res) => {
    try{
        const books = await bookModel.find();
        res.send(books);
    }catch(err){
        res.send(err);
    }
};

export const getABook = async (req, res) => {
    try{
        const id = req.params._id;
        const book = await bookModel.findById(id);
        res.send(book);
    }catch(err){
        res.send(err)
    }
}