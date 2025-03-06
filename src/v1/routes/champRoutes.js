const express = require('express');
const champController = require('../../controller/champsController');
const userController = require('../../controller/usersController');

const router = express.Router();

router.get("/", champController.getAllChamps);

router.get("/users/:user/:pass", userController.getOneUser);

router.post("/userCreate", userController.createNewUser);

router.get("/:champId", champController.getOneChamp);

router.post("/", champController.createNewChamp);

router.patch("/:champId", champController.updateOneChamp);

router.delete("/:champId", champController.deleteOneChamp);

module.exports = router;