const pool = require('../utils/bd');
const T_PRODUCTOS = "productos";
const T_CATEGORIAS = "categorias";

const getAll = async () => {
    try {
        const query = "SELECT p.nombre, p.id, p.descripcion, p.precio, p.stock, c.nombre AS nombreCategoria FROM ?? AS p JOIN ?? AS c ON p.id_categoria = c.id WHERE p.eliminado = 0";
        const params = [T_PRODUCTOS, T_CATEGORIAS];
        return await pool.query(query, params);
    } 
    catch (e){
        console.log(e);
    }
}

const getSingle = async (id) => {
    const query = "SELECT p.nombre, p.id, p.descripcion, p.precio, p.stock, p.id_categoria, c.nombre AS nombreCategoria FROM ?? AS p JOIN ?? AS c ON p.id_categoria = c.id WHERE p.id = ?"
    const params = [T_PRODUCTOS, T_CATEGORIAS, id];
    return await pool.query(query, params);


}

const create = async (obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_PRODUCTOS, obj];
    return await pool.query(query, params);
}

const del = async(id) => {
    const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, id];
    return await pool.query(query, params);
}

const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, obj, id];
    return await pool.query(query, params);
}

module.exports = {getAll, getSingle, create, del, update};