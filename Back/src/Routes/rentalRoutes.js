const express = require("express");
const {
  rental,
  getAllRentalActive,
  returnRental,
  getAllRentalNotActive,
  deleteRental,
  getAllMyRentalActive,
  getAllMyRentalArchived,
} = require("../Controllers/rentalController");

const router = express.Router();

router.post("/add/:product_id", rental);
router.get("/allactive", getAllRentalActive);
router.get("/allnotactive", getAllRentalNotActive);
router.get("/mineactive", getAllMyRentalActive);
router.get("/minearchived", getAllMyRentalArchived);
router.patch("/update/:rental_id", returnRental);
router.delete("/delete/:rental_id", deleteRental);

module.exports = router;
