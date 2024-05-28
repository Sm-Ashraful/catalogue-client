import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ product }) => {
  return (
    <Link
      href={`/shop/${product.name}?category=${product.category}&productId=${product._id}`}
      className="w-full cursor-pointer"
    >
      <div className="w-[195px] h-[293px] flex justify-center items-center">
        <Image
          src={product.image?.url}
          alt={product.name}
          height={512}
          width={385}
        />
      </div>
      <div>
        <h4 className="text-2xl font-semibold uppercase hover:text-black/70">
          {product.name}
        </h4>
        <p>{product.variants.length} variants</p>
      </div>
    </Link>
  );
};

export default Card;
