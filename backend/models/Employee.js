import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    NIC: {
      type: String, 
    },
    img: {
      type: String, 
    },
    birthCertificate: {
      type: String, 
    },
    position: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    NIC_NO: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
