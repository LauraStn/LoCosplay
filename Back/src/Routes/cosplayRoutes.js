const express = require("express")
const { addCosplay, getAllCosplay, getOneCosplay, updateCosplay, deleteCosplay } = require("../Controllers/cosplayController")
const { verifAddProductData } = require("../Utils/middlewares")

const router = express.Router()

router.post("/add", addCosplay)
router.get('/all', getAllCosplay)
router.patch('/update/:id',  updateCosplay)
router.delete('/delete/:id', deleteCosplay)
router.get('/one/:id', getOneCosplay)

module.exports = router