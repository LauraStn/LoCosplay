const { pool } = require("../Services/Connexion");
require('dotenv').config()
const { Cosplay } = require("../Models/Cosplay");
const { extractToken } = require("../Utils/extractToken");
const { verifyToken } = require("../Utils/verifyToken");

const addCosplay = async (req, res) =>{
    const data = await verifyToken(req)
    if(!data){
      return
    }
    try {
        if(data.role_id !== 1){
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    if(
        !req.body.name ||
        !req.body.size ||
        !req.body.price||
        !req.body.stock
    ){
        res.status(400).json({ error: 'Missing fields' })
        return
    }
    const cosplay = new Cosplay(
        req.body.name,
        req.body.size, 
        req.body.price,
        req.body.stock
    )
    const sql = `INSERT INTO cosplay (name, size, price, stock) VALUES (?,?,?,?)`
    const values = [cosplay.name, cosplay.size, cosplay.price, cosplay.stock]
    const [rows] = await pool.execute(sql, values)
    res.status(201).json({success: true, msg: 'Created'})

   } catch (error) {
    res.status(500).json({error: error.stack})
   }
    
}
const getAllCosplay = async (req, res) =>{
    try {
        const [rows] = await pool.query(`SELECT * FROM cosplay`)
        res.status(200).json(rows)
        return
    } catch (error) {
        res.status(500).json({error: error.stack})
        return
    }
}

const getOneCosplay = async (req, res) =>{
    const id = req.params.id
    try {
        const values = [id]
        const sql = `SELECT * FROM cosplay WHERE id=? `
        const [rows] = await pool.execute(sql, values)
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({error: error.stack})
    }
}

const updateCosplay  = async (req, res) =>{
    const verify = await verifyToken(req)

    if(!verify){
        res.status(401).json({ error: 'Unauthorized' })
        return
    }
    console.log(verify);

    try {
        if(verify.role_id !== 1){
            res.status(401).json({ error: 'Unauthorized' })
            return    
        }
        const id = req.params.id
        const {name, size, price, stock} = req.body
        const data = []
        const values = []
        
          if (name) {
            data.push("name= ?");
            values.push(name);
          }
          if (size) {
            data.push("size= ?");
            values.push(size);
          }
          if (price) {
            data.push("price= ?");
            values.push(price);
          }
          if (stock) {
            data.push("stock= ?");
            values.push(stock);
          }
        if (values.length > 0){
            values.push(id)
            data.join(",")
            const sql = `UPDATE cosplay SET ${data} WHERE cosplay.id=? `
            const [rows] = await pool.execute(sql,values)
            res.status(200).json({success: true, msg: 'Updated'})
    }
    } catch (error) {
        res.status(500).json({error: error.stack})
    }
}
const deleteCosplay = async (req, res) => {
    const data = await verifyToken(req)
    if(!data){
        res.status(401).json({ error: 'Unauthorized' })
        return
    }
    console.log(data);
    try {
        if(data.role_id !== 1){
            res.status(401).json({ error: 'Unauthorized' })
            return    
        }
        const id = req.params.id

        const sql = `DELETE FROM cosplay WHERE id =?`
        const values = [id]
        const [rows] = await pool.execute(sql, values)
        res.status(200).json({success: true, msg: 'Deleted'})
    } catch (error) {
        res.status(500).json({error: error.stack})
        
    }
}
module.exports = {addCosplay, getAllCosplay, getOneCosplay, updateCosplay, deleteCosplay}