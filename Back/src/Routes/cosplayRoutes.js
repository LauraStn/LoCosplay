const express = require("express")
const { addCosplay, getAllCosplay, getOneCosplay, updateCosplay, deleteCosplay, adminGetStock, searchCosplay } = require("../Controllers/cosplayController")
const { verifAddProductData } = require("../Utils/middlewares")

const router = express.Router()

router.post("/add", addCosplay)
router.get('/all', getAllCosplay)
router.patch('/update/:id',  updateCosplay)
router.delete('/delete/:id', deleteCosplay)
router.get('/one/:id', getOneCosplay)
router.get('/stock', adminGetStock)
router.get('/search', searchCosplay)

module.exports = router