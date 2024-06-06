"use client";
import React, { useState, useEffect } from "react";
import { API } from "../../urlConfig";

// Replace with your actual API URL

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    products: [],
    categories: [],
  });

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ products: [], categories: [] });
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${API}/product/search?query=${searchQuery}`
        );
        const data = await response.json();
        console.log("Search data: ", data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="max-w-full mx-auto">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-4 pr-10 rounded bg-black/10 text-black border focus:outline-none focus:border-[#f69a21]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-2 top-3 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
        </div>
      </div>
      <div className="w-full bg-white z-50h-[500px]">
        {searchResults.products.length > 0 && (
          <div>
            <h2>Products</h2>
            <ul>
              {searchResults.products.map((product) => (
                <li key={product._id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )}
        {searchResults.categories.length > 0 && (
          <div>
            <h2>Categories</h2>
            <ul>
              {searchResults.categories.map((category) => (
                <li key={category._id}>{category.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
