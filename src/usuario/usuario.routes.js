import { Router } from "express"
import { getUserById, getUsers, deleteUser,  updateUser } from "./usuario.controller.js"
import { deleteUserValidator, updateUserValidator} from "../middlewares/usuario-validator.js"

const router = Router()

router.get("/findUser/:uid", getUserById)

router.get("/", getUsers)

router.patch("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updateUser/:uid", updateUserValidator, updateUser)


export default router