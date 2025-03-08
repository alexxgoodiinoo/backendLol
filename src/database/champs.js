const DB = require("../db/BBDD");
DB.conectar();

const getAllChamps = async (filterParams) => {
  try {
    // let champs = DB.champions;
    let champs = await DB.getChamps();
    if(filterParams.role){
      return DB.champions.filter((champ) => champ.role.toLowerCase().includes(filterParams.role));
    }
    return champs;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneChamp = async (champId) => {
  try {
    // const champ = DB.champions.find((champ) => champ.id === champId);
    let champ = await DB.getOneChamp(champId);
    if (!champ) {
      throw {
        status: 400,
        message: `Can't find champ with the id '${champId}'`,
      };
    }
    return champ;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewChamp = async (newChamp) => {
  try {
    await DB.createNewChamp(newChamp);
    return newChamp;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneChamp = async (champId, changes) => {
  try {
    // const indexForUpdate = DB.champions.findIndex(
    //   (champ) => champ.id === champId
    // );
    // if (indexForUpdate === -1) {
    //   throw {
    //     status: 400,
    //     message: `Can't find champ with the id '${champId}'`
    //   };
    // }
    const updateChamp = {
      ...await DB.getOneChamp(champId),
      ...changes,
      updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    await DB.updateOneChamp(updateChamp, champId);
    return updateChamp;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneChamp = async (champId) => {
    try{
        // const indexForDelete = DB.champions.findIndex(
        //     (champ) => champ.id === champId
        //   );
        //   if (indexForDelete === -1) {
        //     throw {
        //         status: 400,
        //         message: `Can't find champ with the id '${champId}'`
        //       };
        //   }
        await DB.deleteOneChamp(champId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllChamps,
  createNewChamp,
  getOneChamp,
  updateOneChamp,
  deleteOneChamp,
};
