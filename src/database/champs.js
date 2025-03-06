const DB = require("./db.json");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "./db.json");

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

const getAllChamps = (filterParams) => {
  try {
    let champs = DB.champions;
    if(filterParams.role){
      return DB.champions.filter((champ) => champ.role.toLowerCase().includes(filterParams.role));
    }
    return champs;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneChamp = (champId) => {
  try {
    const champ = DB.champions.find((champ) => champ.id === champId);
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

const createNewChamp = (newChamp) => {
  const isAlreadyAdded =
    DB.champions.findIndex((champ) => champ.name === newChamp.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Champ with the name '${newChamp.name}' already exists`,
    };
  }
  try {
    DB.champions.push(newChamp);
    writeDB(DB);
    return newChamp;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneChamp = (champId, changes) => {
  try {
    const isAlreadyAdded = DB.champions.findIndex((champ) => champ.name === changes.name) > -1;
    if(isAlreadyAdded){
        throw {
            status: 400,
            message: `Champ with the name '${changes.name}' already exists`
        };
    }
    const indexForUpdate = DB.champions.findIndex(
      (champ) => champ.id === champId
    );
    console.log(indexForUpdate);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find champ with the id '${champId}'`
      };
    }
    const updateChamp = {
      ...DB.champions[indexForUpdate],
      ...changes,
      updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.champions[indexForUpdate] = updateChamp;
    writeDB(DB);
    return updateChamp;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneChamp = (champId) => {
    try{
        const indexForDelete = DB.champions.findIndex(
            (champ) => champ.id === champId
          );
          if (indexForDelete === -1) {
            throw {
                status: 400,
                message: `Can't find champ with the id '${champId}'`
              };
          }
          DB.champions.splice(indexForDelete, 1);
          writeDB(DB);
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
