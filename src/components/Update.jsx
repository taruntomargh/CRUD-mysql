import axios from "axios";
import React, { useState } from "react";

const Update = (props) => {

  const [updateProduct, setUpdateProduct] = useState({
    id: props.id,
    name: "",
    category: "",
    description: "",
    price: null,
  });

  const handleChange = (e) => {
    setUpdateProduct((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(props.id);

    try {
      await axios.put("http://localhost:8800/", updateProduct);
      window.location.reload();
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#ffffff" }}>Update</h3>
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter category"
          name="category"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter price"
          name="price"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};

export default Update;
