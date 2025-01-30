import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

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
    if (user) {
      setInfo({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

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
      console.error("Error uploading file:", err);
      return null;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const imageUrl = file ? await uploadFileToCloudinary(file, "User_System") : user.img;

    const updatedUser = {
      ...info,
      img: imageUrl,
    };

    try {
      await axios.put(`/api/users/${userId}`, updatedUser);
      alert("User updated!");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data.</div>;

  return (
    <div className="flex w-full">
      <div className="flex-6">
        <div className="shadow-md p-2.5 m-5">
          <h1 className="text-gray-400 text-xl">Edit User</h1>
        </div>
        <div className="shadow-md p-2.5 m-5 flex">
          <div className="flex-1 text-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="User"
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
                  <div
                    className={`w-6 h-6 border-2 flex items-center justify-center rounded-md transition-all ${
                      info.isAdmin ? "bg-blue-500 border-blue-600" : "border-gray-400"
                    }`}
                  >
                    {info.isAdmin && <span className="text-white font-bold">✓</span>}
                  </div>
                  <span className="text-gray-700">{info.isAdmin ? "Admin" : "User"}</span>
                </label>
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

export default EditUser;
