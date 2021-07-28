const pool = require('./../utils/bd');

const crearUsuario = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [process.env.T_USUARIOS, obj];
    return await pool.query(query, params);
}

const verify = async(uid) => {
    const query = "UPDATE ?? SET habilitado = 1 WHERE confirmacionCorreo = ?"
    const params = [process.env.T_USUARIOS, uid];
    return await pool.query(query, params);
}

const enter = async(username, pass) => {
const query = "SELECT * FROM ?? WHERE username = ? AND pass = ? AND habilitado = 1 AND eliminado = 0";
const params = [process.env.T_USUARIOS, username, pass];
return await pool.query(query, params);
}


module.exports = {crearUsuario, verify, enter};