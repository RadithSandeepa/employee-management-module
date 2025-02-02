import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import toast from "react-hot-toast";

const Profile = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loading) {
      toast.loading("Loading user data...");
    }
    if (user) {
      toast.dismiss();
      setInfo({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
      });
    }
    if (error) {
      toast.dismiss();
      toast.error("Error fetching user data.");
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

    // Basic Input Validations
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
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
        toast.error("Password cannot be empty!");
        return;
    }
  
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters!");
        return;
    }

    if (password) {
        try {
            await axios.put(`/api/users/${userId}/changepassword`, { password });
            toast.success("Password updated successfully!");
            setPassword(""); // Clear password field after update
        } catch (err) {
            toast.error("Error updating password.");
        }
    }
  };

  return (
    <div className="flex w-full p-5">
      <div className="flex-6">
        <div className="shadow-md p-4 mb-5">
          <h1 className="text-gray-500 text-2xl font-semibold">Profile</h1>
        </div>
        <div className="shadow-md p-4 flex">
          <div className="flex-1 text-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex-2 px-5">
            <form className="flex flex-wrap gap-6 justify-between">
              {/* Image Upload */}
              <div className="w-2/5">
                <label htmlFor="file" className="flex items-center gap-2.5">
                  Change Image: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
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
                  className="w-full p-2 border-b border-gray-400 focus:outline-none"
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
                  className="w-full p-2 border-b border-gray-400 focus:outline-none"
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
                  className="w-full p-2 border-b border-gray-400 focus:outline-none"
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
                className="w-36 p-2 bg-teal-500 text-white font-bold rounded-md cursor-pointer mt-2.5 hover:bg-teal-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        {/* Password Change Section */}
        <div className="shadow-md p-4 mt-6">
          <h2 className="text-gray-500 text-xl font-semibold mb-4">Change Password</h2>
          <form className="flex flex-col gap-4">
            <div className="w-2/5">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-b border-gray-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-36 p-2 bg-blue-500 text-white font-bold rounded-md cursor-pointer mt-2.5 hover:bg-blue-600"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
