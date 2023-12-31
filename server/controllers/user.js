import { bookModel } from "../model/db_model.js";
import { userModel } from "../model/user.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        const isThereAUser = await userModel.findOne({username});

        if(!isThereAUser) return res.json({status: false, msg: `User with username '${username}' does not exist`});

        const isPasswordRight = await bcrypt.compare(password, isThereAUser.password);

        if(!isPasswordRight) return res.json({status: false, msg: "Wrong password"});

        return res.json({status: true, isThereAUser});

    }catch(err){
        res.send(err);
    }
}

export const register = async (req, res) => {
    try{
        const {username, password, repeatPassword} = req.body;

        const isUsernameNotAvailable = await userModel.findOne({username});

        if(isUsernameNotAvailable) return res.json({status: false, msg: "Username already in use"});

        if(password !== repeatPassword) return res.json({status: false, msg: "Passwords do not match"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username,
            password: hashedPassword,
            wantToRead: [],
            reading: [],
            read: []
        });

        

        return res.json({status: true, createdUser});
        
    }catch(err){
        return res.json({status: false, msg: 'Error'});
    }
}

export const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await userModel.findById(id);
        return res.json({status: true, user});
    }catch(err){
        return res.json({status: false, msg: 'Error'});
    }
}

export const addWantToRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let found = false;

        let user = await userModel.findById(user_id);

        user.wantToRead.forEach(book => {
            if(book === book_id){
                fount = true;
            }
        })

        if(found){
            return res.json({ status: false, msg: 'Book is already on the list'});
        }else{
            user.wantToRead.push(book_id);

            await userModel.replaceOne({ _id: user_id}, user);
            return res.json({ status: true, user});
        }

    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}