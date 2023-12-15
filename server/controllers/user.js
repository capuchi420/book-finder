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

        console.log(username)
        console.log(password)
        console.log(repeatPassword)

        const isUsernameNotAvailable = await userModel.findOne({username});

        if(isUsernameNotAvailable) return res.json({status: false, msg: "Username already in use"});

        if(password !== repeatPassword) return res.json({status: false, msg: "Passwords do not match"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username,
            password: hashedPassword
        });

        

        return res.json({status: true, createdUser});
        
    }catch(err){
        res.json({status: false, msg: 'Error'});
    }
}