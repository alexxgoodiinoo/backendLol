const User = require('../database/user');

const getOneUser = (usuario, password) => {
    try{
        const user = User.getOneUser(usuario, password);
        return user;
    }catch(error){
        throw error;
    }
};

const createNewUser = (newUser) => {
    const userToInsert = {
        ...newUser
    };
    try{
        const createdUser = User.createNewUser(userToInsert);
        return createdUser;
    }catch(error){
        throw error;
    };
};

module.exports = {
    getOneUser,
    createNewUser
};