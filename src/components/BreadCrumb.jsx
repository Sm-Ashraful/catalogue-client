"use client";
import { useSearchParams } from "next/navigation";

import React from "react";

const BreadCrumb = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      {data.map((link, idx) => {
        return <p key={idx}>{link}/</p>;
      })}
    </div>
  );
};

export default BreadCrumb;
