"use client";
import React, { useState, useEffect } from "react";
import { API } from "../../../urlConfig";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API}/categories`);
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
    <div className="fixed left-20 h-[90vh] w-[12rem]   p-4  border-r hidden sm:block">
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
