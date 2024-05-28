import React from "react";
import { API } from "../../../urlConfig";
import Card from "@/components/Card";

const Product = async () => {
  const response = await fetch(`${API}/product`);
  const products = await response.json();

  return (
    <div className="grid sm:grid-cols-4 gap-4">
      {products.data.map((product) => {
        return <Card key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Product;
