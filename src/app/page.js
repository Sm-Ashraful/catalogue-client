import SearchBox from "@/components/SearchBox";
import Sidebar from "./views/Sidebar";
import Product from "./views/Product";

export default function Home() {
  return (
    <main className="relative mx-20">
      <Sidebar />
      <div className="pl-[13rem] pt-5">
        <SearchBox />
        <Product />
      </div>
    </main>
  );
}
