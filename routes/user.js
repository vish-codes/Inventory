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

router.put("/re-assign/:id", async (req, res) => {
  const { assignedTo, remark, accessories} = req.body;
  const {id} = req.params
  const getLaptopUser = await Laptops.findById({id});
  const laptop = await Laptops.updateOne({_id:id},{assignedTo, remark, accessories});
  const result = await History.updateOne({_id:id},{$push:{assignHistory:getLaptopUser.assignedTo}});
  res.status(200).json({ message: "data updated successfully" , data : result });
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
