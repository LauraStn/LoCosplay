const { pool } = require("../Services/Connexion");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require("../Models/User");
const bcrypt = require('bcrypt');
const { extractToken } = require("../Utils/extractToken");

const register = async (req, res) => {
    try {
    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.address

    ) {
        res.status(400).json({ error: 'Missing fields' })
        console.log("missing fields");
        return
    }
    const hashedPassword = await bcrypt.hash(req.body.password + '', 10)
    const user = new User(
        req.body.email,
        hashedPassword,
        2,
        req.body.first_name,
        req.body.last_name,
        req.body.address,
        new Date(),
        new Date(),
        new Date(),
    )
    const email = [user.email]
    const sqlverif = `SELECT email FROM user WHERE email=?`
    const [verifEMail] = await pool.execute(sqlverif, email)
  
    if(verifEMail.length>0){
      res.status(400).json({message: "email already used"});
      return
    }  
    const sql = `INSERT INTO user (email, password, first_name, last_name, address) VALUES (?,?,?,?,?)`
    const values = [user.email,user.password,user.first_name,user.last_name,user.address]
    const [rows] = await pool.execute(sql, values);
    res.status(201).json(rows);
        } catch (err) {
          res.status(500).json({error: err.stack})
          console.log(err.stack);
        }
};
const getAllUsers = async (req, res) => {
    try {
      const rows = await pool.query("SELECT * FROM user");
      console.log(rows);
      res.json(rows);
    } catch (err) {
      console.log(err.stack);
    }
};
const updateUser = async (req, res) => {
      try {
        const data = req.data;
        const values = req.values;
        console.log(data);
        const sql = `UPDATE user SET ${data} WHERE id=?`;
        const [result] = await pool.execute(sql, values);
        res.status(200).json(result);
      } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: "erreur serveur" });
      }
};
const deleteUser = async (req, res) => {
  try {
    const id= req.params.id
    const values = [id]
    const sql = `DELETE FROM user WHERE id = ?`;

    const [result] = await pool.execute(sql, values)
  res.status(200).json(result);

  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getOneUser = async (req,res) => {
  try{
  const id = req.params.id;
  const values = [id]
  const sql = `SELECT * FROM user WHERE id=?`
  
  const [result] = await pool.execute(sql, values)
  res.status(200).json(result);
}catch (error) {
  console.log(error.stack);
  res.status(500).json({ message: "erreur serveur" });
}
}

const login = async (req, res) => {
  try {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password){
    res.status(400).json({error: 'Missing fields'})
    return
  }
  const values = [email]
  const sql = `SELECT * FROM user WHERE email=?`
  const [user] = await pool.execute(sql, values)
  console.log(user);
  if(!user.length>0){
    res.status(204).json({ error: 'No content'});
    return
  } 
    const isValidPassword = await bcrypt.compare(password, user[0].password)
    if (!isValidPassword) {
      res.status(401).json({ error: 'Wrong credentials' })
      return
    }else {
      const token = jwt.sign(
          {
              id: user[0].id,
              firstName: user[0].first_name,
              lastName: user[0].last_name,
              email: user[0].email,
              address: user[0].address,
              role_id: user[0].role_id
          },
          process.env.SECRET_KEY,
          { expiresIn: '24h' }
      )
      res.status(200).json({ jwt: token })
      return
    }
  } catch (error) {
    res.status(500).json({error: error.stack})
    return
  }
  
}

module.exports = {register, getAllUsers, updateUser, deleteUser, getOneUser, login}