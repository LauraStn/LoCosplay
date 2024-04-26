const { pool } = require("../Services/Connexion");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { extractToken } = require("../Utils/extractToken");
const { Rental } = require("../Models/Rental");
const { verifyToken } = require("../Utils/verifyToken");

const rental = async (req,res) => {
    // const token = await extractToken(req)
    const product_id = req.params.product_id
    
    // console.log(req.body);
    // jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
    //     if (error) {
    //         res.status(401).json({ error: 'Unauthorized' })
    //         console.log('Unauthorized');
    //         return
    //     } else {
            const data = await verifyToken(req)
            console.log(res);
            if(!data){
                res.status(401).json({ error: 'Unauthorized' })
                return
            }
            try {
                const newRental = new Rental(
                     data.id,
                     product_id,
                     req.body.reservation_start,
                     req.body.reservation_end,
                     true
                )
                const values = [data.id, product_id, newRental.reservation_start, newRental.reservation_end ]
                const sql = `INSERT INTO rental (user_id, cosplay_id, reservation_start, reservation_end) VALUES (?,?,?,?)`
                const [rows] = await pool.execute(sql, values)
                res.status(500).json(rows)
                return
            } catch (error) {
                res.status(500).json({error: error.stack})
                return
            }
            
        
    // } )
    
}
const getAllRental = async (req,res) => {
    // const token = await extractToken(req)
   
    // jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
    //     if (error) {
    //         res.status(401).json({ error: 'Unauthorized' })
    //         console.log('Unauthorized');
    //         return
    //     } else {
        const data = await verifyToken(req)
        console.log(data);
        if(!data){
            res.status(401).json({ error: 'Unauthorized' })
            return
        }
            try {
                if(data.role_id=== 1){
                    const [rows] = await pool.execute(`SELECT * FROM rental`)
                    res.status(500).json(rows)
                    return
                }else{
                    res.status(401).json({ error: 'Unauthorized' })
                    return
                }
            } catch (error) {
                res.status(500).json({error: error.stack})
                console.log('error server');
            }
            
        // }
    // } )
}
 
const getAllMyRental = async (req,res) => {
    // const token = await extractToken(req)
   
    // jwt.verify(token, process.env.SECRET_KEY, async (error, data)=>{
    //     if (error) {
    //         res.status(401).json({ error: 'Unauthorized' })
    //         console.log('Unauthorized');
    //         return
    //     } else {
            const data = await verifyToken(req)
            if(!data){
                res.status(401).json({ error: 'Unauthorized' })
                return
            }
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
            
        // }
    // } )
}
module.exports = {rental, getAllRental, getAllMyRental}