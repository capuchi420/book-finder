import { forumModel } from "../model/forum.js";

export const getAllForums = async (req, res) => {
    try{
        const forums = await forumModel.find();
        return res.json(forums);
    }catch(err){
        return res.json(err);
    }
};

export const getAForum = async (req, res) => {
    try{
        const id = req.params._id;
        const forum = await forumModel.findById(id);
        return res.json(forum);
    }catch(err){
        return res.json(err)
    }
};

export const postAComment = async (req, res) => {
    try{
        const {user_id, comment, forum_id} = req.body;

        const forum = await forumModel.findById(forum_id);
        forum.comments.push({user_id: user_id, comment: comment});

        await forumModel.replaceOne({_id: forum_id}, forum);
        return res.json({status: true, forum});
    }catch(err){
        return res.json(err);
    }
}