"use client";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://catalogue-dusky.vercel.app/api/categories"
      );
      const data = await response.json();
      console.log("Data: ", data);
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (!categories) return <div>Loading</div>;

  return (
    <div className="absolute left-0 w-[12rem]   p-4  border-r">
      <h4 className="font-semibold pb-3">Categories</h4>
      <div className="mb-2">
        <label className="flex items-center space-x-2 text-black">
          <input
            type="radio"
            name="category"
            value={"all"}
            checked={selectedCategory === "all"}
            onChange={() => handleCategoryChange("all")}
            className="form-radio text-blue-600"
          />
          <span className="capitalize font-medium">All Categories</span>
        </label>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <label className="flex items-center space-x-2 text-black">
            <input
              type="radio"
              name="category"
              value={category.name}
              checked={selectedCategory === category.name}
              onChange={() => handleCategoryChange(category.name)}
              className="form-radio text-blue-600"
            />
            <span className="capitalize font-medium">{category.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
