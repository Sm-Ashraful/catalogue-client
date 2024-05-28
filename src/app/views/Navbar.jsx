import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-center items-center py-2.5 z-50 bg-[#686D76] h-[80px]">
      <div>
        <Image src="/mit.webp" alt="logo" width={80} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
