import Image from "next/image";
import React from "react";

const VariantCard = ({ variant }) => {
  const stock = variant.stock; // e.g., "10 cases (360 boxes)" or "00"

  let casesPart = "N/A";
  let boxesPart = "N/A";

  if (stock && stock.trim() !== "0" && stock.trim() !== "00") {
    const [cases] = stock.split(" ");
    casesPart = `${cases} cases`;

    const boxesMatch = stock.match(/\(([^)]+)\)/);
    if (boxesMatch) {
      boxesPart = `${boxesMatch[1]}`; // Extract the content inside the parentheses
    }
  }
  return (
    <div className="my-5 bg-slate-200 p-5 border border-[#f69a21] rounded-lg xl:grid grid-cols-2 gap-3">
      <div className="relative flex flex-col items-center">
        <Image
          src={variant.image?.url}
          alt={variant._id}
          width={300}
          height={500}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="py-2 text-[#f69a21] text-lg hover:bg-slate-300 w-full flex justify-between px-4">
          <p className="font-bold">Product ID</p>
          <p>{variant.productId}</p>
        </div>
        {variant?.customProperties &&
          (Array.isArray(variant.customProperties)
            ? variant.customProperties.map(({ key, value }, idx) => (
                <div
                  className="py-2 hover:bg-slate-300 w-full flex justify-between px-4"
                  key={idx}
                >
                  <p className="font-bold">{key}:</p>
                  <p>{value}</p>
                </div>
              ))
            : Object.entries(variant.customProperties).map(
                ([key, value], idx) => (
                  <div
                    className="py-2 hover:bg-slate-300 w-full flex justify-between px-4"
                    key={idx}
                  >
                    <p className="font-bold">{key}:</p>
                    <p>{value}</p>
                  </div>
                )
              ))}

        <div className="py-2 hover:bg-slate-300 w-full flex justify-between px-4">
          <p className="font-bold">Unit Per Box</p>
          <p>{variant.unitsPerBox} units</p>
        </div>
        <div className="py-2 hover:bg-slate-300 w-full flex justify-between px-4">
          <p className="font-bold">Box Per Case</p>
          <p>{variant.boxPerCase} boxes</p>
        </div>
        <div className="py-2 hover:bg-slate-300 w-full flex justify-between px-4">
          <p className="font-bold">Stock</p>
          <p className="text-green-400 font-semibold">
            {casesPart}
            <br />
            {boxesPart}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
