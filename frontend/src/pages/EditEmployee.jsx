import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { employeeId } = useParams(); // Get employee ID from URL
  const { data: employee, loading, error } = useFetch(`/api/employees/${employeeId}`);

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

  useEffect(() => {
    if (loading) {
      toast.loading("Loading employee data...");
    }
    if (employee) {
      toast.dismiss(); // Remove loading toast
      setInfo({
        name: employee.name || "",
        email: employee.email || "",
        NIC_NO: employee.NIC_NO || "",
        position: employee.position || "",
        contactNumber: employee.contactNumber || "",
      });
    }
    if (error) {
      toast.dismiss();
      toast.error("Failed to fetch employee data.");
    }
  }, [employee, loading, error]); // Runs when employee, loading, or error state changes


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const uploadFileToCloudinary = async (file, uploadPreset) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("resource_type", "raw"); // Handle PDFs correctly

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtrgqkjzl/upload",
        data
      );
      return uploadRes.data.secure_url; // Return uploaded file URL
    } catch (err) {
      console.error("Error uploading file:", err);
      return null;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // Upload new files if provided
    const nicUrl = await uploadFileToCloudinary(nic, "EM_System");
    const birthCertificateUrl = await uploadFileToCloudinary(birthCertificate, "EM_System");
    const imageUrl = file ? await uploadFileToCloudinary(file, "EM_System") : null;

    const updatedEmployee = {
      ...info,
      NIC: nicUrl || employee.NIC, // Keep existing file if not updated
      birthCertificate: birthCertificateUrl || employee.birthCertificate,
      img: imageUrl || employee.img,
    };

    try {
      await axios.put(`/api/employees/${employeeId}`, updatedEmployee);
      toast.success("Employee updated successfully!");
    } catch (err) {
      toast.error("Error updating employee.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching employee data.</div>;

  return (
    <div className="flex w-full">
      <div className="flex-6">
        <div className="shadow-md p-2.5 m-5">
          <h1 className="text-gray-400 text-xl">Edit Employee</h1>
        </div>
        <div className="shadow-md p-2.5 m-5 flex">
          <div className="flex-1 text-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : employee.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Employee"
              className="w-24 h-24 rounded-full object-cover"
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
                  id="name"
                  value={info.name}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Email Input */}
              <div className="w-2/5">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  value={info.email}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* NIC Number Input */}
              <div className="w-2/5">
                <label htmlFor="NIC_NO">NIC Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="NIC_NO"
                  value={info.NIC_NO}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Position Input */}
              <div className="w-2/5">
                <label htmlFor="position">Position</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="position"
                  value={info.position}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Contact Number Input */}
              <div className="w-2/5">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="contactNumber"
                  value={info.contactNumber}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUpdate}
                className="w-36 p-2.5 bg-teal-500 text-white font-bold cursor-pointer mt-2.5"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
