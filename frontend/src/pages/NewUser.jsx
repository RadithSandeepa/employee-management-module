import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NewUser = ({ title }) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setInfo((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadFileToCloudinary = async (file, uploadPreset) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtrgqkjzl/upload",
        data
      );
      return uploadRes.data.secure_url;
    } catch (err) {
      console.error("Error uploading file:", err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!info.username.trim() || !info.email.trim() || !info.phone.trim()) {
      toast.error("All fields must be filled!");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(info.email)) {
      toast.error("Invalid email format!");
      return;
    }
    
    if (!/^\d+$/.test(info.phone)) {
      toast.error("Phone number should contain only digits!");
      return;
    }

    if (info.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    const imageUrl = file ? await uploadFileToCloudinary(file, "EM_System") : null;

    const newUser = {
      ...info,
      img: imageUrl,
    };

    try {
      await axios.post("/api/auth/register/", newUser);
      toast.success("User added successfully!");
    } catch (err) {
      toast.error("Error adding user.");
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-6">
        <div className="shadow-md p-2.5 m-5">
          <h1 className="text-gray-400 text-xl">{title}</h1>
        </div>
        <div className="shadow-md p-2.5 m-5 flex">
          <div className="flex-1 text-center">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-2 px-5">
            <form className="flex flex-wrap gap-8 justify-between">
              <div className="w-2/5">
                <label htmlFor="file" className="flex items-center gap-2.5">
                  Profile Image: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
              <div className="w-2/5">
                <label htmlFor="username">Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>
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
              <div className="w-2/5">
                <label htmlFor="phone">Phone</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Phone Number"
                  id="phone"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>
              <div className="w-2/5">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>
              <div className="w-2/5">
                <label htmlFor="isAdmin" className="flex items-center gap-2.5">
                  Admin:
                  <input
                    type="checkbox"
                    id="isAdmin"
                    onChange={handleChange}
                    className="ml-2"
                  />
                </label>
              </div>
              <button
                onClick={handleClick}
                className="w-36 p-2.5 bg-teal-500 text-white font-bold cursor-pointer mt-2.5"
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

export default NewUser;
