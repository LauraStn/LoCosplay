const { pool } = require("../Services/Connexion");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { extractToken } = require("../Utils/extractToken");
const { Rental } = require("../Models/Rental");
const { verifyToken } = require("../Utils/verifyToken");

const rental = async (req, res) => {
  const product_id = req.params.product_id;

  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const stockValue = [product_id];
    const stockSql = `SELECT stock FROM cosplay WHERE cosplay_id=?`;
    const [stock] = await pool.execute(stockSql, stockValue);
    if (stock[0].stock === 0) {
      res.status(401).json({ error: "sold out" });
      console.log("sold out");
      return;
    }
    const newRental = new Rental(
      data.user_id,
      product_id,
      req.body.reservation_start,
      req.body.reservation_end,
      true
    );
    const values = [
      data.user_id,
      product_id,
      newRental.reservation_start,
      newRental.reservation_end,
    ];
    console.log(values);
    const sql = `INSERT INTO rental (user_id, cosplay_id, reservation_start, reservation_end) VALUES (?,?,?,?)`;
    const [rows] = await pool.execute(sql, values);
    res.status(201).json({ message: "rent" });
    console.log("rent");
    return;
  } catch (error) {
    res.status(500).json({ error: error.stack });
    console.log("error");
    return;
  }
};

const getAllRentalActive = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id === 1) {
      const [rows] = await pool.execute(
        `SELECT * FROM rental INNER JOIN cosplay ON rental.cosplay_id = cosplay.cosplay_id INNER JOIN user ON rental.user_id= user.user_id WHERE rental.is_active=1 `
      );
      res.status(200).json(rows);
      console.log(rows);
      return;
    } else {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const getAllRentalNotActive = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id === 1) {
      const [rows] = await pool.execute(
        `SELECT * FROM rental INNER JOIN cosplay ON rental.cosplay_id = cosplay.cosplay_id INNER JOIN user ON rental.user_id= user.user_id WHERE rental.is_active=0 `
      );
      res.status(200).json(rows);
      return;
    } else {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const getAllMyRentalActive = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const values = [data.user_id];
    const sql = `SELECT * FROM rental INNER JOIN cosplay ON rental.cosplay_id = cosplay.cosplay_id WHERE user_id= ? AND is_active= 1`;
    const [rows] = await pool.execute(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const getAllMyRentalArchived = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const values = [data.user_id];
    const sql = `SELECT * FROM rental INNER JOIN cosplay ON rental.cosplay_id = cosplay.cosplay_id WHERE user_id= ? AND is_active= 0`;
    const [rows] = await pool.execute(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const returnRental = async (req, res) => {
  const rental_id = req.params.rental_id;

  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    if (data.role_id === 1) {
      const values = [rental_id];
      const sql = `UPDATE rental SET is_active = '0' WHERE rental.rental_id = ?`;
      const [rows] = await pool.execute(sql, values);
      res.status(200).json(rows);
      console.log("returned !");
      return;
    } else {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};

const deleteRental = async (req, res) => {
  const data = await verifyToken(req);
  if (!data) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const id = req.params.rental_id;
    console.log(data);
    const sql = `DELETE FROM rental WHERE rental_id =? AND user_id=?`;
    const values = [id, data.user_id];
    console.log(values);
    const [rows] = await pool.execute(sql, values);
    res.status(200).json({ success: true, msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

module.exports = {
  rental,
  getAllRentalActive,
  getAllMyRentalActive,
  getAllMyRentalArchived,
  returnRental,
  getAllRentalNotActive,
  deleteRental,
};
