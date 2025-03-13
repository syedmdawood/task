import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { UploadIcon } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfile = ({ onClose }) => {
  const { userData, setUserData, getUserData, token } = useContext(AppContext);

  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");

  const [address, setAddress] = useState(userData.address || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [dob, setDob] = useState(userData.dob || "");
  const [image, setImage] = useState(null); // Make it null initially

  const updateData = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("dob", dob);

      if (image) formData.append("image", image); // Append the image only if it exists

      const { data } = await axios.post(
        "http://localhost:4000/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData(); // Refresh user data
        setImage(null); // Reset image
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10 overflow-y-scroll"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-[400px] h-10/12 bg-white p-4 rounded-md shadow-lg relative text-black flex flex-col items-center overflow-y-scroll">
        <p className="font-semibold pt-3 text-2xl items-center">
          Edit Profile Data
        </p>
        <form className="flex flex-col w-full px-4" onSubmit={updateData}>
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image} // Show the selected image or default
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : UploadIcon}
                alt=""
              />
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <label className="text-sm mt-3">Name</label>
          <input
            type="text"
            className="border border-zinc-300 p-2 rounded-md mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="text-sm">Email</label>
          <input
            type="email"
            className="border border-zinc-300 p-2 rounded-md mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm">Address</label>
          <input
            type="text"
            className="border border-zinc-300 p-2 rounded-md mb-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label className="text-sm">Phone</label>
          <input
            type="text"
            className="border border-zinc-300 p-2 rounded-md mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="text-sm">Date of Birth</label>
          <input
            type="date"
            className="border border-zinc-300 p-2 rounded-md mb-3"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-md mt-4"
          >
            Save Changes
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
