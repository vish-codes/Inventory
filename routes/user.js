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
  const { name, assignedTo } = req.body;
  const laptop = await Laptops.create({ laptopName: name, assignedTo });
  await History.create({ _id: laptop._id, users: laptop.assignedTo });
  res.status(200).json({
    message: laptop,
  });
});

router.post("/history", async (req, res) => {
  const id = req.body.param;
  const history = await History.find({});
});

export { router };
