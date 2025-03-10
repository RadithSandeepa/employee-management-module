import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewEmployee = ({ title }) => {
  const [file, setFile] = useState(null);
  const [birthCertificate, setBirthCertificate] = useState(null);
  const [nic, setNIC] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    NIC_NO: "",
    position: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicRegex = /^[0-9]{9}[vVxX]?$|^[0-9]{12}$/;
    const contactRegex = /^[0-9]{10}$/;

    if (!info.name.trim() || !info.email.trim() || !info.NIC_NO.trim() || !info.position.trim() || !info.contactNumber.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    if (!emailRegex.test(info.email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (!nicRegex.test(info.NIC_NO)) {
      toast.error("Invalid NIC number.");
      return false;
    }
    if (!contactRegex.test(info.contactNumber)) {
      toast.error("Invalid contact number (10 digits required).");
      return false;
    }
    return true;
  };

  const uploadFileToCloudinary = async (file, uploadPreset) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("resource_type", "raw"); // Ensure PDFs are handled correctly

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtrgqkjzl/upload",
        data
      );
      return uploadRes.data.secure_url; // Return the uploaded file's secure URL
    } catch (err) {
      toast.error("File upload failed!");
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // Upload NIC (PDF)
    const nicUrl = await uploadFileToCloudinary(nic, "EM_System");

    // Upload birth certificate (PDF)
    const birthCertificateUrl = await uploadFileToCloudinary(birthCertificate, "EM_System");

    // Upload image (if any)
    const imageUrl = file ? await uploadFileToCloudinary(file, "EM_System") : null;

    if ((nicUrl && birthCertificateUrl) || imageUrl) {
      toast.success("Files uploaded!");
    } else {
      toast.error("File upload failed!");
      return;
    }

    // Combine all data
    const newEmployee = {
      ...info,
      NIC: nicUrl,
      birthCertificate: birthCertificateUrl,
      img: imageUrl,
    };

    // Send data to the backend
    try {
      await axios.post("/api/employees/", newEmployee);
      toast.success("Employee added successfully!");
    } catch (err) {
      toast.error("Error adding employee!");
    }
  };

  return (
    <div className="flex w-full mt-5">
      <div className="flex-6">
        <div className="p-2.5 m-5">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="p-2.5 m-5 flex">
          <div className="flex-1 flex text-center align-center justify-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex-2 px-5">
            <form className="flex flex-wrap gap-8 justify-between">
              {/* Image Upload */}
              <div className="w-2/5">
                <label htmlFor="file" className="flex items-center gap-2.5">
                  Image: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Birth Certificate Upload */}
              <div className="w-2/5">
                <label htmlFor="birthCertificate" className="flex items-center gap-2.5">
                  Birth Certificate: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="birthCertificate"
                  accept="application/pdf"
                  onChange={(e) => setBirthCertificate(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* NIC Upload */}
              <div className="w-2/5">
                <label htmlFor="nic" className="flex items-center gap-2.5">
                  NIC: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="nic"
                  accept="application/pdf"
                  onChange={(e) => setNIC(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Name Input */}
              <div className="w-2/5">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Name"
                  id="name"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Email Input */}
              <div className="w-2/5">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* NIC Number Input */}
              <div className="w-2/5">
                <label htmlFor="NIC_NO">NIC Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter NIC Number"
                  id="NIC_NO"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Position Input */}
              <div className="w-2/5">
                <label htmlFor="position">Position</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Position"
                  id="position"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Contact Number Input */}
              <div className="w-2/5">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Contact Number"
                  id="contactNumber"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleClick}
                className="w-36 p-2 bg-gray-900 text-white cursor-pointer mt-2.5 hover:scale-110 transition-all duration-200"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;