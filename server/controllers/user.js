import { bookModel } from "../model/db_model.js";
import { userModel } from "../model/user.js";
import bcrypt from 'bcrypt';


// LOGIN FUNCTION
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

        user.reading.forEach(book => {
            if(book === book_id){
                found = true;
            }
        })

        if(found){
            let update = [];
            user.reading.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.reading = update;
        }

        let foundInRead = false;

        user.read.forEach(book => {
            if(book === book_id){
                foundInRead = true;
            }
        })

        if(foundInRead){
            let update = [];
            user.read.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.read = update;
        }

        user.wantToRead.push(book_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

export const addReading = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        let foundInWTR = false;

        user.wantToRead.forEach(book => {
            if(book === book_id){
                foundInWTR = true;
            }
        });

        if(foundInWTR){
            let update = [];
            user.wantToRead.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.wantToRead = update;
        }

        let foundInRead = false;

        user.read.forEach(book => {
            if(book === book_id){
                foundInRead = true;
            }
        });

        if(foundInRead){
            let update = [];
            user.read.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.read = update;
        }

        user.reading.push(book_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

export const removeReading = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let update = [];

        let user = await userModel.findById(user_id);

        user.reading.forEach(book => {
            if(book !== book_id){
                update.push(book);
            }
        })

        user.reading = update;

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});

    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

export const removeWantToRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        let update = [];
        
        user.wantToRead.forEach(book => {
            if(book !== book_id){
                update.push(book);
            }
        });

        user.wantToRead = update;

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({status: true, msg: "Removed", user});
    }catch(err){
        return res.json({ status: false, msg: 'Book removed from Want to read'});
    }
}

export const addFavForum = async (req, res) => {
    try{
        const { forum_id, user_id } = req.body;

        let found = false;

        let user = await userModel.findById(user_id);

        user.favForums.forEach(forum => {
            if(forum === forum_id){
                found = true;
            }
        })

        if(found){
            let update = [];
            user.favForums.forEach(forum => {
                if(forum !== forum_id){
                    update.push(forum);
                }
            });
            user.favForums = update;
        }
        user.favForums.push(forum_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Forum is already on the list'});
    }
}

export const removeFavForum = async (req, res) => {
    try{
        const { forum_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        let update = [];
        
        user.favForums.forEach(forum => {
            if(forum !== forum_id){
                update.push(forum);
            }
        });

        user.favForums = update;

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({status: true, msg: "Removed", user});
    }catch(err){
        return res.json({ status: false, msg: 'Forum removed from Favorites'});
    }
}

export const addRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        let foundInWTR = false;

        user.wantToRead.forEach(book => {
            if(book === book_id){
                foundInWTR = true;
            }
        });

        if(foundInWTR){
            let update = [];
            user.wantToRead.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.wantToRead = update;
        }

        let foundInReading = false;

        user.reading.forEach(book => {
            if(book === book_id){
                foundInReading = true;
            }
        });

        if(foundInReading){
            let update = [];
            user.reading.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.reading = update;
        }


        user.read.push(book_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

export const removeRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        let update = [];
        
        user.read.forEach(book => {
            if(book !== book_id){
                update.push(book);
            }
        });

        user.read = update;

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({status: true, msg: "Removed", user});
    }catch(err){
        return res.json({ status: false, msg: 'Book removed from Read'});
    }
}