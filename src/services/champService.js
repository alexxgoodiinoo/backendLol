const {v4:uuid} = require('uuid');
const Champ = require('../database/champs');

const getAllChamps = async (filterParams) => {
    try{
        const allChamps = await Champ.getAllChamps(filterParams);
        return allChamps;
    }catch(error){
        throw error;
    }
};

const getOneChamp = async (champId) => {
    try{
        const champ = await Champ.getOneChamp(champId);
        return champ;
    }catch(error){
        throw error;
    }
};

const createNewChamp = async (newChamp) => {
    const champToInsert = {
        id: uuid(),
        ...newChamp,
        createdAt: new Date().toLocaleDateString("en-US", {timeZone: "UTC"}),
        updateAt: new Date().toLocaleDateString("en-US", {timeZone: "UTC"}),
    };
    try{
        const createdChamp = await Champ.createNewChamp(champToInsert);
        return createdChamp;
    }catch(error){
        throw error;
    };
};

const updateOneChamp = async (champId, changes) => {
    try{
        const updatedChamp = await Champ.updateOneChamp(champId, changes);
        return updatedChamp;
    }catch(error){
        throw error;
    }
};

const deleteOneChamp = async (champId) => {
    try{
        await Champ.deleteOneChamp(champId);
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