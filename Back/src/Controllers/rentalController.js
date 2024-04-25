const { pool } = require("../Services/Connexion");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { extractToken } = require("../Utils/extractToken");

const rental = async (req,res) => {
    const token = await extractToken(req)
    const product_id = req.params.id
    const resa_start = req.body.resa_start
    const resa_end = req.body.resa_end
    
    jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
        if (error) {
            res.status(401).json({ error: 'Unauthorized' })
            console.log('Unauthorized');
            return
        } else {
            try {
                console.log(data.id);
                const values = [data.id, product_id, resa_start, resa_end ]
                const sql = `INSERT INTO rental (user_id, cosplay_id, reservation_start, reservation_end) VALUES (?,?,?,?)`
                const [rows] = await pool.execute(sql, values)
                res.status(500).json(rows)

            } catch (error) {
                res.status(500).json({error: error.stack})
                console.log('error server');
            }
            
        }
    } )
    
}
const getAllRental = async (req,res) => {
    const token = await extractToken(req)
   
    jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
        if (error) {
            res.status(401).json({ error: 'Unauthorized' })
            console.log('Unauthorized');
            return
        } else {
            try {
                console.log(data);
                if(data.role_id=== 1){
                    const [rows] = await pool.execute(`SELECT * FROM rental`)
                    res.status(500).json(rows)
                }else{
                    res.status(401).json({ error: 'Unauthorized' })
                }
            } catch (error) {
                res.status(500).json({error: error.stack})
                console.log('error server');
            }
            
        }
    } )
}
 
const getAllMyRental = async (req,res) => {
    const token = await extractToken(req)
   
    jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
        if (error) {
            res.status(401).json({ error: 'Unauthorized' })
            console.log('Unauthorized');
            return
        } else {
            try {
                console.log(data);
                const values = [data.id]
                const sql = `SELECT * FROM rental WHERE user_id=?`
                const [rows] = await pool.execute(sql, values)
                res.status(500).json(rows)
                
            } catch (error) {
                res.status(500).json({error: error.stack})
                console.log('error server');
            }
            
        }
    } )
}
module.exports = {rental, getAllRental, getAllMyRental}