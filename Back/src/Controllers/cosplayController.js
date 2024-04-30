const { pool } = require("../Services/Connexion");
require("dotenv").config();
const { Cosplay } = require("../Models/Cosplay");
const { extractToken } = require("../Utils/extractToken");
const { verifyToken } = require("../Utils/verifyToken");

const addCosplay = async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (
      !req.body.name ||
      !req.body.size ||
      !req.body.price ||
      !req.body.stock ||
      !req.body.image
    ) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }
    const cosplay = new Cosplay(
      req.body.name,
      req.body.size,
      req.body.price,
      req.body.stock,
      req.body.image
    );
    const sql = `INSERT INTO cosplay (name, size, price, stock, image) VALUES (?,?,?,?,?)`;
    const values = [
      cosplay.name,
      cosplay.size,
      cosplay.price,
      cosplay.stock,
      cosplay.image,
    ];
    const [rows] = await pool.execute(sql, values);
    res.status(201).json({ success: true, msg: "Created" });
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};
const getAllCosplay = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM cosplay`);
    res.status(200).json(rows);
    return;
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};

const getOneCosplay = async (req, res) => {
  const id = req.params.id;
  try {
    const values = [id];
    const sql = `SELECT * FROM cosplay WHERE cosplay_id=? `;
    const [rows] = await pool.execute(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const updateCosplay = async (req, res) => {
  const verify = await verifyToken(req);

  if (!verify) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (verify.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const id = req.params.id;
    const { name, size, price, stock, image } = req.body;
    const data = [];
    const values = [];
    console.log(values);
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
    if (image) {
      data.push("image= ?");
      values.push(image);
    }
    if (values.length > 0) {
      values.push(id);
      data.join(",");
      const sql = `UPDATE cosplay SET ${data} WHERE cosplay.cosplay_id=? `;
      const [rows] = await pool.execute(sql, values);
      res.status(200).json({ success: true, msg: "Updated" });
      console.log("updated");
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
    console.log("500");
  }
};
const deleteCosplay = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const id = req.params.id;

    const sql = `DELETE FROM cosplay WHERE cosplay_id =?`;
    const values = [id];
    const [rows] = await pool.execute(sql, values);
    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const adminGetStock = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const [rows] = await pool.query(
      `SELECT * FROM cosplay WHERE cosplay.stock>0;`
    );
    res.status(200).json(rows);
    return;
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const searchCosplay = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });

    return;
  }
  try {
    if (data.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const search = req.body.search;
    const [rows] = await pool.query(
      `SELECT * FROM cosplay WHERE name LIKE "%${search}%"`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};
const getCosplayNotRented = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id !== 1) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const [rows] = await pool.query(`SELECT *
            FROM cosplay
            WHERE cosplay.cosplay_id
            NOT IN
            (SELECT rental.cosplay_id
             FROM rental)`);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};
module.exports = {
  addCosplay,
  getAllCosplay,
  getOneCosplay,
  updateCosplay,
  deleteCosplay,
  adminGetStock,
  searchCosplay,
  getCosplayNotRented,
};
