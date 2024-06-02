"use client";
import React, { useEffect, useState } from "react";
import { API } from "../../../../urlConfig";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API}/categories`);
      const data = await response.json();
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", categoryId);
    formData.append("image", productImage);

    const response = await fetch(`${API}/product/add`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Result: ", result);
    if (response.ok) {
      alert("Product added successfully!");
      // Reset form
      setProductName("");
      setCategoryId("");
      setProductImage(null);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-xl ">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-4">
        <div className="w-full flex flex-col">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border py-2 px-4"
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="border py-2 px-4"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col">
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            className="border py-2 "
          />
        </div>
        <button type="submit" className="bg-amber-500 py-1.5 text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
