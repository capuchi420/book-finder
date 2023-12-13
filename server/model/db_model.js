import mongoose from 'mongoose';

const schema = mongoose.Schema({
    book_name: {
        type: String,
        required: true
    },
    book_author: {
        type: String,
        required: true
    },
    book_img_url: {
        type: String,
        required: true
    },
    book_desc: {
        type: String
    }
});

export const bookModel = mongoose.model('books', schema);