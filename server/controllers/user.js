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

// REGISTER FUNCTION
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

// GET A USER FUNCTION
export const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await userModel.findById(id);
        return res.json({status: true, user});
    }catch(err){
        return res.json({status: false, msg: 'Error'});
    }
}

// ADD A BOOK TO WANT TO READ LIST FUNCTION
export const addWantToRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;
        let user = await userModel.findById(user_id);

        // CHECK IF THE BOOK IS IN OTHER LIST (READING) IF IT IS, REMOVE IT

        user.reading.forEach(book => {
            if(book === book_id){
                foundInReading = true;
            }
        })

        if(foundinReading){
            let update = [];
            user.reading.forEach(book => {
                if(book !== book_id){
                    update.push(book);
                }
            });
            user.reading = update;
        }

        // CHECK IF THE BOOK IS IN OTHER LIST (READ) IF IT IS, REMOVE IT
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

        // ADD A BOOK TO WANT TO READ
        user.wantToRead.push(book_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

// REMOVE A BOOOK FROM WANT TO READ LIST FUNCTION
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

// ADD A BOOK TO READING LIST FUNCTION
export const addReading = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        // CHECK IF THE BOOK IS IN OTHER LIST (WANT TO READ) IF IT IS, REMOVE IT
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

        // CHECK IF THE BOOK IS IN OTHER LIST (READ) IF IT IS, REMOVE IT
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

        // ADD A BOOK TO READING LIST
        user.reading.push(book_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Book is already on the list'});
    }
}

// REMOVE A BOOK FROM READING LIST FUNCTION
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

// ADD A BOOK TO READ LIST FUNCTION
export const addRead = async (req, res) => {
    try{
        const { book_id, user_id } = req.body;

        let user = await userModel.findById(user_id);

        // CHECK IF THE BOOK IS IN OTHER LIST (WANT TO READ) IF IT IS, REMOVE IT
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

        // CHECK IF THE BOOK IS IN OTHER LIST (READING) IF IT IS, REMOVE IT
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

// REMOVE A BOOK FROM READ LIST FUNCTION
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

// ADD A FORUM TO THE FAV FORUM LIST FUNCTION
export const addFavForum = async (req, res) => {
    try{
        const { forum_id, user_id } = req.body;
        let user = await userModel.findById(user_id);

        user.favForums.push(forum_id);

        await userModel.replaceOne({ _id: user_id}, user);
        return res.json({ status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Forum is already on the list'});
    }
}

// REMOVE A FOURM FROM THE FAV FORUM LIST FUNCTION
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
        return res.json({status: true, user});
    }catch(err){
        return res.json({ status: false, msg: 'Forum removed from Favorites'});
    }
}