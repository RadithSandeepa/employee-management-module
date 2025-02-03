import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import toast from "react-hot-toast";

const EditUser = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (loading) {
      toast.loading("Loading user data...");
    }
    if (user) {
      toast.dismiss(); // Remove loading toast
      setInfo({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
      });
    }
    if (error) {
      toast.dismiss();
      toast.error("Failed to fetch user data.");
    }
  }, [user, loading, error]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = () => {
    setInfo((prev) => ({ ...prev, isAdmin: !prev.isAdmin }));
  };

  const uploadFileToCloudinary = async (file, uploadPreset) => {
    if (!file) return null;

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
      toast.error("Error uploading image.");
      return null;
    }
  };

  const handleUpdate = async (e) => {
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

    const imageUrl = file ? await uploadFileToCloudinary(file, "EM_System") : user.img;

    const updatedUser = {
      ...info,
      img: imageUrl,
    };

    try {
      await axios.put(`/api/users/${userId}`, updatedUser);
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error("Error updating user.");
    }
  };

  return (
    <div className="flex w-full mt-5">
      <div className="flex-6">
        <div className="p-2.5 m-5">
          <h1 className="text-3xl font-semibold">Edit User</h1>
        </div>
        <div className="p-2.5 m-5 flex">
          <div className="flex-1 flex text-center align-center justify-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="User"
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

              {/* Username Input */}
              <div className="w-2/5">
                <label htmlFor="username">Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="username"
                  value={info.username}
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

              {/* Phone Input */}
              <div className="w-2/5">
                <label htmlFor="phone">Phone</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="phone"
                  value={info.phone}
                  className="w-full p-1 border-b border-gray-400"
                />
              </div>

              {/* Role Checkbox */}
              <div className="w-2/5 flex items-center gap-2">
                <label htmlFor="isAdmin" className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={info.isAdmin}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="text-black">{info.isAdmin ? "Admin" : "User"}:</span>
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center rounded-md transition-all ${
                      info.isAdmin ? "bg-gray-500 border-gray-600" : "border-gray-400"
                    }`}
                  >
                    {info.isAdmin && <span className="text-white font-bold">✓</span>}
                  </div>
                </label>
              </div>
              {/* Submit Button */}
              <button
                onClick={handleUpdate}
                className="w-36 p-2 bg-gray-900 text-white cursor-pointer mt-2.5 hover:scale-110 transition-all duration-200"
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

export default EditUser;
