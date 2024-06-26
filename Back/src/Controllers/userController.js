const { pool } = require("../Services/Connexion");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
const { extractToken } = require("../Utils/extractToken");
const { verifyToken } = require("../Utils/verifyToken");
// const { transporter } = require("../Services/mailer");

const register = async (req, res) => {
  try {
    if (
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.address
    ) {
      res.status(400).json({ error: "Missing fields" });
      console.log("missing fields");
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password + "", 10);
    // let activationToken = await bcrypt.hash(req.body.email, 10);
    // activationToken = activationToken.replaceAll("/", "");

    const user = new User(
      req.body.email,
      hashedPassword,
      2,
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      // activationToken,
      new Date(),
      new Date(),
      new Date()
    );
    const email = [user.email];
    const sqlverif = `SELECT email FROM user WHERE email=?`;
    const [verifEMail] = await pool.execute(sqlverif, email);
    if (verifEMail.length > 0) {
      res.status(400).json({ message: "email already used" });
      return;
    }
    console.log(user.email);
    const sql = `INSERT INTO user (email, password, first_name, last_name, address) VALUES (?,?,?,?,?)`;
    const values = [
      user.email,
      user.password,
      user.first_name,
      user.last_name,
      user.address,
      // user.token,
    ];
    const [rows] = await pool.execute(sql, values);

    // const info = await transporter.sendMail({
    //   from: `${process.env.SMTP_EMAIL}`,
    //   to: user.email,
    //   subject: "Account activation",
    //   text: "Activate your email",
    //   html: `<p>You need to activate your email, to access our services, please click on this link: <a href="http://localhost:440/user/activate/${activationToken}">Activate your email</a></p>`,
    // });

    // console.log("Message sent: %s", info.messageId);

    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.stack });
    console.log(err.stack);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
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
    const [sql] = `UPDATE user SET ${data} WHERE user_id=?`;
    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const deleteUser = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const id = data.id;
    const values = [id];
    const sql = `DELETE FROM user WHERE user_id = ?`;

    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getOneUser = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const id = data.id;
    const values = [id];
    const sql = `SELECT * FROM user WHERE user_id=?`;

    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }
    const values = [email];
    const sql = `SELECT * FROM user WHERE email=?`;
    const [user] = await pool.execute(sql, values);
    if (!user.length) {
      res.status(401).json({ error: "Email not found" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Wrong credentials" });
      return;
    } else {
      const token = jwt.sign(
        {
          user_id: user[0].user_id,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: user[0].email,
          address: user[0].address,
          role_id: user[0].role_id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.status(200).json({ jwt: token, role_id: user[0].role_id });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};

// const validateAccount = async (req, res) => {
//   try {
//     const token = req.params.token;
//     const sql = `SELECT * FROM user WHERE token=?`;
//     const value = [token];
//     const [result] = await pool.execute(sql, value);
//     if (!result) {
//       res.status(204).json("no content");
//       return;
//     }
//     await pool.query(`UPDATE user SET is_active=1 WHERE token=?`, [value]);
//     res.status(200).json({ result: "good" });
//   } catch (error) {
//     res.status(500).json({ error: error.stack });
//     return;
//   }
// };

module.exports = {
  register,
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser,
  login,
};
