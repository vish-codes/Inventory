import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("db connected successfully"));

const laptopSchema = new mongoose.Schema({
  laptopName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
  },
  assignedTo: { type: String, required: true, minLength: 2, trim: true },
});

const laptopHistory = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: "Laptops" },
  users: [
    {
      type: String,
    },
  ],
});

const Laptops = mongoose.model("Laptops", laptopSchema);
const History = mongoose.model("History", laptopHistory);

export { Laptops, History };
