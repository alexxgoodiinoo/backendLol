const userService = require('../services/userService');

const getOneUser = (req, res) => {
    try{
        const usuario = userService.getOneUser(req.params.user, req.params.pass);
        res.send({ status:'OK', data: usuario });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewUser = (req, res) => {
    const body = req.body;
    if(
        !body.usuario ||
        !body.email ||
        !body.password
    ){
        res.status(400).send({
            status: "FAILED",
            data:{
                error:
                    "One of the following keys is missing or is empty in request body: usuario, email, password"
            },
        });
        return;
    }
    const newUser = {
        usuario: body.usuario,
        email: body.email,
        password: body.password
    };
    try{
        const createdUser = userService.createNewUser(newUser);
        res.status(201).send({status: 'OK', data: createdUser});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getOneUser,
    createNewUser
};