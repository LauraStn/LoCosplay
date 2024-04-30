const express = require("express");
const {
  rental,
  getAllRentalActive,
  getAllMyRental,
  returnRental,
  getAllRentalNotActive,
} = require("../Controllers/rentalController");

const router = express.Router();

router.post("/add/:product_id", rental);
router.get("/allactive", getAllRentalActive);
router.get("/allnotactive", getAllRentalNotActive);
router.get("/mine", getAllMyRental);
// router.patch('/update/:id',  updateCosplay)
router.patch("/update/:rental_id", returnRental);
// router.get('/one/:id', getOneCosplay)

module.exports = router;
