const { Client } = require("pg");
require('dotenv').config();

const cliente = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

function conectar() {
  cliente.connect();
}

function desconectar() {
  cliente.end();
}

async function getChamps() {
  try {
    const respuesta = await cliente.query('SELECT * FROM public."Champ"');
    return respuesta.rows;
  } catch (err) {
    throw err;
  }
}

async function getOneChamp(id) {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Champ" WHERE id = $1',
      [id]
    );
    return respuesta.rows;
  } catch (err) {
    throw err;
  }
}

async function createNewChamp(newChamp) {
  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Champ"(id, name, role, abilities, region, description, imagen, createdat, updateat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        newChamp.id,
        newChamp.name,
        newChamp.role,
        JSON.stringify(newChamp.abilities),
        newChamp.region,
        newChamp.description,
        newChamp.imagen,
        newChamp.createdAt,
        newChamp.updateAt,
      ]
    );
    return respuesta.rows;
  } catch (err) {
    throw err;
  }
}

async function updateOneChamp(updateChamp, id) {
  try {
    const respuesta = await cliente.query(
      'UPDATE public."Champ" SET name = $1, role = $2, abilities = $3, region = $4, description = $5, imagen = $6, createdat = $7, updateat = $8 WHERE id = $9',
      [
        updateChamp.name,
        updateChamp.role,
        JSON.stringify(updateChamp.abilities),
        updateChamp.region,
        updateChamp.description,
        updateChamp.imagen,
        updateChamp.createdAt,
        updateChamp.updateAt,
        id,
      ]
    );
    return respuesta.rows;
  } catch (err) {
    throw err;
  }
}

async function deleteOneChamp(id) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Champ" WHERE id = $1',
      [id]
    );
    return respuesta.rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  conectar,
  desconectar,
  getChamps,
  getOneChamp,
  createNewChamp,
  updateOneChamp,
  deleteOneChamp
};
