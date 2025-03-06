const champsService = require('../services/champService');

const getAllChamps = (req, res) => {
    const { role } = req.query;
    try{
        const allChamps = champsService.getAllChamps({ role });
        res.send({ status:'OK', data: allChamps });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneChamp = (req, res) => {
    const{
        params: {champId},
    } = req;
    if(!champId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':champId' can not be empty" }, 
            });
    }
    try{
        const champ = champsService.getOneChamp(champId);
        res.send({ status:'OK', data: champ });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewChamp = (req, res) => {
    const body = req.body;
    if(
        !body.name ||
        !body.role ||
        !body.abilities ||
        !body.region ||
        !body.description ||
        !body.imagen
    ){
        res.status(400).send({
            status: "FAILED",
            data:{
                error:
                    "One of the following keys is missing or is empty in request body: name, role, abilities, region, description, imagen"
            },
        });
        return;
    }
    const newChamp = {
        name: body.name,
        role: body.role,
        abilities: body.abilities,
        region: body.region,
        description: body.description,
        imagen: body.imagen,
    };
    try{
        const createdChamp = champsService.createNewChamp(newChamp);
        res.status(201).send({status: 'OK', data: createdChamp});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneChamp = (req, res) => {
    const {
        body,
        params: {champId}
    } = req;
    if(!champId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':champId' can not be empty" } 
            });
    }
    try{
        const updatedChamp = champsService.updateOneChamp(champId, body);
        res.send({status: 'OK', data: updatedChamp});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneChamp = (req, res) => {
    const {
        params: {champId},
    } = req;
    if(!champId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':champId' can not be empty" } 
            });
    }
    try{
        champsService.deleteOneChamp(champId);
        res.status(204).send({status: 'OK'});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllChamps,
    getOneChamp,
    createNewChamp,
    updateOneChamp,
    deleteOneChamp,
};