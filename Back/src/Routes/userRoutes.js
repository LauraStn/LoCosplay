const express = require("express")
const { verifData, verifUpdate, verifUserUpdate, verifRegisterData } = require("../Utils/middlewares")
const { getAllUsers, updateUser, deleteUser, login, getOneUser, register } = require("../Controllers/userController")

const router = express.Router()

router.post("/register", verifRegisterData, register)
router.get('/all', getAllUsers)
router.patch('/update/:id', verifUserUpdate, updateUser)
router.delete('/delete', deleteUser)
router.get('/one', getOneUser)
router.post('/login', login)

module.exports = router