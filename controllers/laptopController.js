import { Admin, History, Laptops } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { JWT_SECRET } from "../server.js";

// ZOD validation for login

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


/** @desc create Admin
  * @route GET /api/v1/adminLogin
  * @access public
 */


async function createAdmin(req, res) {

  const { email, password } = req.body;
  const response = await Admin.findOne({ email });
  if (response) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  try{
  const salt = await bcrypt.genSalt(10);
  const hashedPasswod = await bcrypt.hash(password, salt);

  await Admin.create({email, password: hashedPasswod});
  res.status(201).json({ message: `${email} admin created successfully` });

  }catch(error){
    res.status(403).json({ message: "error while creating admin" });  
  }
} 

/** @desc login
  * @route POST /api/v1/login
  * @access public
 */


async function login (req, res){
  const {email, password} = req.body;
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / incorrect inputs" });
  }

  const response = await Admin.findOne({ email });
  if (!response) {
    return res.status(400).json({ message: "Admin doesn't exists" });
  }

  try{
    const validPass = await bcrypt.compare(password, response.password);
    if (!validPass) {
      return res.status(411).json({ message: "invalid password" });
    }
    console.log('one')
    const userId = response._id;
    const token = jwt.sign({ userId }, JWT_SECRET)
    if(token){
      res.status(200).json({
        message: `user ${response.email} logged in successfully`,
        token,
      });
    }

  }catch(error){
    res.status(403).json({ message: "error while loggin in" });  
  }
}
    


/** @desc get all laptops
  * @route GET /api/v1/allLaptops
  * @access public
 */


async function getAllItems(req, res) {
    const details = await Laptops.find({});
    const history = await History.find({});
    res.status(200).json({
      status: "success",
      data: details,
      history
  });
}

/**
 * @desc add new laptop
 * @route POST /api/v1/addLaptop
 * @access public
 */



async function addNewLaptop (req, res) {
    const { laptopName, systemId, assignedTo, ownedBy, ownerName, accessories, remark, empId, date } = req.body; 
    const laptop = await Laptops.create({ laptopName, systemId, assignedTo, ownedBy, ownerName, accessories, remark, empId, date });
    await History.create({ laptopId: laptop._id, assignHistory: assignedTo });
    const laptops = await Laptops.find({})
    res.status(200).json({
    status: "success",
      data: laptops,
    });
}

/**
 * @desc re assign to user
 * @route PUT /api/v1/reAssign/:id
 * @access public
 */


async function reAssign (req, res)  {
    const { assignedTo, remark, accessories} = req.body;
    const {id} = req.params
    const getLaptopUser = await Laptops.findById({_id:id});
    const laptop = await Laptops.updateOne({_id:id},{assignedTo, remark, accessories});
    if(getLaptopUser.assignedTo !== assignedTo){
    const result = await History.updateOne({laptopId:id},{$push:{assignHistory:getLaptopUser.assignedTo}});
    }
    const finalData = await Laptops.find({});
    res.status(200).json({ message: "data updated successfully" , data : finalData });
}


/**
 * @desc delete entry
 * @route POST /api/v1/delete/:id
 * @access public
 */

async function deleteLaptop (req, res) {
    const { id } = req.params;
  
    try {
      await Laptops.deleteOne({ _id: id });
      await History.deleteOne({ laptopId: id });
      const data = await Laptops.find({})
      res.status(200).json({ message: "success on deletion", data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
}

/**
 * @desc get laptops history
 * @route POST /api/v1/history/:id
 * @access public
 */

async function getHistory (req, res) {
    const { id } = req.params;
    const history = await History.findOne({ laptopId: id });
    res.status(200).json({
      status: "success",
      data: history,
    });
}

export { getAllItems, addNewLaptop, reAssign, deleteLaptop, getHistory, createAdmin, login }
