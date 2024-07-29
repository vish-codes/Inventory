import { Router } from "express";
import { History, Laptops } from "../db.js";

const router = Router();

router.get("/allLaptops", async(req, res) => {
  const details = await Laptops.find({});
  res.status(200).json({
    status: "success",
    data: details,
  });
});

router.post("/addLaptop", async (req, res) => {
  const { laptopName, systemId, assignedTo, ownedBy, ownerName, accessories, remark, empId, date } = req.body; 
  const laptop = await Laptops.create({ laptopName, systemId, assignedTo, ownedBy, ownerName, accessories, remark, empId, date });
  await History.create({ laptopId: laptop._id, assignHistory: assignedTo });
  const laptops = await Laptops.find({})
  res.status(200).json({
  status: "success",
    data: laptops,
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

router.put("/reAssign/:id", async (req, res) => {
  const { assignedTo, remark, accessories} = req.body;
  const {id} = req.params
  const getLaptopUser = await Laptops.findById({_id:id});
  const laptop = await Laptops.updateOne({_id:id},{assignedTo, remark, accessories});
  if(getLaptopUser.assignedTo !== assignedTo){
  const result = await History.updateOne({laptopId:id},{$push:{assignHistory:getLaptopUser.assignedTo}});
  }
  const finalData = await Laptops.find({});
  res.status(200).json({ message: "data updated successfully" , data : finalData });
});

router.delete("/delete/:id", async (req, res) => {
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
});

export { router };
