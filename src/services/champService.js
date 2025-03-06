const {v4:uuid} = require('uuid');
const Champ = require('../database/champs');

const getAllChamps = (filterParams) => {
    try{
        const allChamps = Champ.getAllChamps(filterParams);
        return allChamps;
    }catch(error){
        throw error;
    }
};

const getOneChamp = (champId) => {
    try{
        const champ = Champ.getOneChamp(champId);
        return champ;
    }catch(error){
        throw error;
    }
};

const createNewChamp = (newChamp) => {
    const champToInsert = {
        id: uuid(),
        ...newChamp,
        createdAt: new Date().toLocaleDateString("en-US", {timeZone: "UTC"}),
        updateAt: new Date().toLocaleDateString("en-US", {timeZone: "UTC"}),
    };
    try{
        const createdChamp = Champ.createNewChamp(champToInsert);
        return createdChamp;
    }catch(error){
        throw error;
    };
};

const updateOneChamp = (champId, changes) => {
    try{
        const updatedChamp = Champ.updateOneChamp(champId, changes);
        return updatedChamp;
    }catch(error){
        throw error;
    }
};

const deleteOneChamp = (champId) => {
    try{
        Champ.deleteOneChamp(champId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllChamps,
    getOneChamp,
    createNewChamp,
    updateOneChamp,
    deleteOneChamp,
};