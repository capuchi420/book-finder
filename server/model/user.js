import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wantToRead: {
        type: Array
    },
    reading:{
        type: Array
    },
    read: {
        type: Array
    }
});

export const userModel = mongoose.model('users', schema);