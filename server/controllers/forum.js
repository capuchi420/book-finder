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