import React from "react";
import { API } from "../../../urlConfig";
import Card from "../../components/Card";

const Product = (products) => {
  console.log("PRoducts; ", products);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
      {products.products.map((product) => {
        return <Card key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Product;
