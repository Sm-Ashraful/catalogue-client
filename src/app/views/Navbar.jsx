import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-center items-center py-2.5 z-50 bg-[#092635] h-[80px]">
      <Link href="/">
        <Image src="/mit.png" alt="logo" width={80} height={30} />
      </Link>
    </div>
  );
};

export default Navbar;
