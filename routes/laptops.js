import { Router } from "express";
import { getAllItems, addNewLaptop, reAssign, deleteLaptop, createAdmin, login} from '../controllers/laptopController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @desc create admin
 * @route GET /api/v1/adminLogin
 * @access public
 */

router.post("/adminLogin", createAdmin);


/**
 * @desc admin login/jwt
 * @route GET /api/v1/login
 * @access public
 */

router.post("/login", login);



/**
 * @desc get all laptops
 * @route GET /api/v1/allLaptops
 * @access public
 */

router.get("/allLaptops",getAllItems);

/**
 * @desc add new laptop
 * @route POST /api/v1/addLaptop
 * @access public
 */

router.post("/addLaptop", addNewLaptop);
// router.post("/addLaptop",authMiddleware, addNewLaptop);

/**
 * @desc re assign to user
 * @route PUT /api/v1/reAssign/:id
 * @access public
 */

router.put("/reAssign/:id", reAssign);

/**
 * @desc delete entry
 * @route POST /api/v1/delete/:id
 * @access public
 */

router.delete("/delete/:id",authMiddleware,deleteLaptop );

// /**
//  * @desc get laptops history
//  * @route POST /api/v1/history/:id
//  * @access public
//  */

// router.get("/history/:id",authMiddleware, getHistory)

export { router };
