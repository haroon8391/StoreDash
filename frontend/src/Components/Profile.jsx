import React, { useEffect } from "react";
import { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-center my-5">Profile Page</h1>
      <div className="my-3">
        <label className="mx-3">Email:</label>
        <input
          type="text"
          name="email"
          value={userData.email}
          readOnly={true}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="mx-3">Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          readOnly={true}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Profile;
