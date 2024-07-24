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
   }, // "laptopName":"HP EliteBook", "assignedTo":"Anand Vish", "ownedBy":"Company", "accessories":"", "remark":""
   systemId:{ type: String, required: true},
  assignedTo: { type: String, required: true, minLength: 2, trim: true, default: "N/A" },
  ownedBy: { type: String, required: true, default :"Company" },
  ownerName: { type: String, default:"Panorama" },
  remark: { type: String, default: "None" },
  accessories : [
    {
      type: String,
      default: "None"
    },
  ]
});

const laptopHistory = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: "Laptops" },
  assignHistory: [
    {
      type: String,
    },
  ],
});

const Laptops = mongoose.model("Laptops", laptopSchema);
const History = mongoose.model("History", laptopHistory);

export { Laptops, History };
