"use client";

import Sidebar from "./views/Sidebar";
import Product from "./views/Product";
import { useEffect, useState } from "react";
import { API } from "../../urlConfig";
import SearchBox from "../components/SearchBox";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${API}/product`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === null) {
      const fetchAllProducts = async () => {
        try {
          const response = await fetch(`${API}/product`);
          const data = await response.json();
          setProducts(data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchAllProducts();
    } else {
      // Fetch products by selected category
      const fetchProductsByCategory = async () => {
        try {
          const response = await fetch(
            `${API}/product/category/${selectedCategory}`
          );
          const data = await response.json();

          setProducts(data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProductsByCategory();
    }
  }, [selectedCategory]);

  if (!products) return <p>Loading...</p>;

  return (
    <main className="relative mx-20 mt-[80px] ">
      <Sidebar
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="sm:pl-[13rem] pt-5">
        <SearchBox />
        <Product products={products} />
      </div>
    </main>
  );
}
