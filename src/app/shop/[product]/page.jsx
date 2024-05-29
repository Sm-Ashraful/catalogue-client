"use client";
import SearchBox from "@/components/SearchBox";
import { API } from "../../../../urlConfig";
import VariantCard from "@/components/VariantCard";
import BreadCrumb from "@/components/BreadCrumb";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const VariantProduct = () => {
  const [productVariants, setProductVariants] = useState(null);
  const [category, setCategories] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const categoryId = searchParams.get("category");

  const decodedName = decodeURIComponent(pathname);
  const productName = decodedName.split("/")[2];

  console.log("Product id: ", categoryId);

  useEffect(() => {
    async function Fetcher() {
      const response = await fetch(`${API}/variant?productId=${productId}`);
      const variantData = await response.json();
      setProductVariants(variantData);
    }
    Fetcher();
  }, [pathname, searchParams, productId]);

  useEffect(() => {
    async function Fetcher() {
      const response = await fetch(`${API}/categories/id`, {
        method: "POST", // Set the method to POST
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({ categoryId }), // Serialize the data
      });
      const categoryResponse = await response.json();
      setCategories(categoryResponse.data);
    }
    Fetcher();
  }, [categoryId, category]);
  return (
    <div className="mx-20 py-10">
      <div className="flex justify-center items-center pb-4 font-semibold gap-3">
        {category && (
          <>
            <Link href={"/"}>All Products</Link>
            <p>/</p>
            <Link href={"/"} className="capitalize">
              {category[0].name}
            </Link>
            <p>/</p>
            <p className="capitalize">{productName}</p>
          </>
        )}
      </div>
      <SearchBox />
      <h4 className="text-2xl font-semibold uppercase">{productName}</h4>
      <div className="grid sm:grid-cols-2 gap-8 ">
        {productVariants?.data.map((variant) => {
          return <VariantCard variant={variant} key={variant._ids} />;
        })}
      </div>
    </div>
  );
};

export default VariantProduct;
