const express = require("express")
const { rental, getAllRental, getAllMyRental } = require("../Controllers/rentalController")

const router = express.Router()

router.post("/add/:product_id", rental )
router.get('/all', getAllRental)
router.get('/mine', getAllMyRental)
// router.patch('/update/:id',  updateCosplay)
// router.delete('/delete/:id', deleteCosplay)
// router.get('/one/:id', getOneCosplay)

module.exports = router