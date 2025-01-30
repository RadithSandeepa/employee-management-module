import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [birthCertificate, setBirthCertificate] = useState("");
  const [educationalCertificate, setEducationalCertificate] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const uploadFileToCloudinary = async (file, uploadPreset) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/radith/upload",
        data
      );
      return uploadRes.data.url; // Return the uploaded file URL
    } catch (err) {
      console.error("Error uploading file:", err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Upload image file
    const imageUrl = await uploadFileToCloudinary(file, "upload");

    // Upload birth certificate (PDF)
    const birthCertificateUrl = await uploadFileToCloudinary(
      birthCertificate,
      "upload"
    );

    // Upload educational certificate (PDF)
    const educationalCertificateUrl = await uploadFileToCloudinary(
      educationalCertificate,
      "upload"
    );

    // Combine all data
    const newUser = {
      ...info,
      img: imageUrl,
      birthCertificate: birthCertificateUrl,
      educationalCertificate: educationalCertificateUrl,
    };

    // Send data to the backend
    try {
      await axios.post("/auth/register", newUser);
      console.log("User registered successfully!");
    } catch (err) {
      console.error("Error registering user:", err);
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
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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

              {/* Educational Certificate Upload */}
              <div className="w-2/5">
                <label htmlFor="educationalCertificate" className="flex items-center gap-2.5">
                  Educational Certificate: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="educationalCertificate"
                  accept="application/pdf"
                  onChange={(e) => setEducationalCertificate(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Other Input Fields */}
              {inputs.map((input) => (
                <div className="w-2/5" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    className="w-full p-1 border-b border-gray-400"
                  />
                </div>
              ))}

              {/* Submit Button */}
              <button
                onClick={handleClick}
                className="w-36 p-2.5 bg-teal-500 text-white font-bold cursor-pointer mt-2.5"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;