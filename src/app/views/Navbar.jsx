import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center py-2.5 bg-[#686D76]">
      <div>
        <Image src="/mit.webp" alt="logo" width={80} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
