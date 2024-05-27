import { cookies } from "next/headers";
import React from "react";

const Product = async () => {
  const response = await fetch(
    "https://catalogue-dusky.vercel.app/api/product"
  );
  const products = await response.json();
  console.log("Products: ", products);
  return <div></div>;
};

export default Product;
