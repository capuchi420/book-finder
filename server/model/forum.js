import mongoose from 'mongoose';

const schema = mongoose.Schema({
    forum_name: {
        type: String,
        required: true
    },
    forum_desc: {
        type: String,
        required: true
    }
});

export const forumModel = mongoose.model('forums', schema);