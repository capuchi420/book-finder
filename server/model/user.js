import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const userModel = mongoose.model('users', schema);