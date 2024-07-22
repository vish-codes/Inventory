import { Router } from "express";
import { History, Laptops } from "../db.js";

const router = Router();

router.get("/user", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "hi",
  });
});

router.post("/laptops", async (req, res) => {
  const { laptopName, assignedTo, ownedBy, ownerName, accessories, remark } = req.body; 
  const laptop = await Laptops.create({ laptopName, assignedTo, ownedBy, ownerName, accessories, remark });
  await History.create({ laptopId: laptop._id, assignHistory: assignedTo });
  res.status(200).json({
    message: laptop,
  });
});

// let tempObj = {
//   laptopId: id,
//   laptopName: laptop,
//   laptopOwnedBy: ownedBy,
//   laptopOwnerName: laptopClientName,
//   accessories: selectedOption,
//   employeeId: employeeId,
// };

// routes 
// laptop schema (id name currentUser assigned-date assesories)

router.get("/re-assign", async (req, res) => {
  const {laptopId, accessories, employeeName} = req.body;
  const laptop = await Laptops.findOne({_id:laptopId});
  const result = await Laptops.update({});
  res.status(200).json({message : history})
});

export { router };
