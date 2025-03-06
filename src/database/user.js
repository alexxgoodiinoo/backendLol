const DB = require("./db.json");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "./db.json");

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

const getOneUser = (usuario, password) => {
  try {
    const user = DB.users.find((user) => user.usuario === usuario && user.password === password);
    if (!user) {
      throw {
        status: 400,
        message: `Can't find user with '${usuario}'`,
      };
    }
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUser = (newUser) => {
  const isAlreadyAdded =
    DB.users.findIndex((user) => user.usuario === newUser.usuario) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `User with the name '${newUser.usuario}' already exists`,
    };
  }
  try {
    DB.users.push(newUser);
    writeDB(DB);
    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = {
  getOneUser,
  createNewUser
};
