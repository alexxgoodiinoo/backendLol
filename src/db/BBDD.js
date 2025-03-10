require('dotenv').config();
const { Pool } = require("pg");

const conexionBBDD = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

if(process.env.ENVIROMENT === 'production'){
  conexionBBDD['ssl'] = { rejectUnauthorized: false };
}

const cliente = new Pool(conexionBBDD);

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
    console.error("Error", err);
    return [];
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
    console.error("Error", err);
    return [];
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
    console.error("Error", err);
    return [];
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
    console.error("Error", err);
    return [];
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
    console.error("Error", err);
    return [];
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
