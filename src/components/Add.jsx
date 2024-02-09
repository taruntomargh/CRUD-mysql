import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [addProduct, setAddProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: null,
  });

  const handleChange = (e) => {
    setAddProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/", addProduct);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#ffffff" }}>Add</h3>
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
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Enter price"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
};

export default Add;
