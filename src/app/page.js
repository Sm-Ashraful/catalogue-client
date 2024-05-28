import SearchBox from "@/components/SearchBox";
import Sidebar from "./views/Sidebar";
import Product from "./views/Product";

export default function Home() {
  return (
    <main className="relative mx-20 mt-[80px]">
      <Sidebar />
      <div className="sm:pl-[13rem] pt-5">
        <SearchBox />
        <Product />
      </div>
    </main>
  );
}
