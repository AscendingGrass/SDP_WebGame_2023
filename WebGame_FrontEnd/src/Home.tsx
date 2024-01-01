import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Outlet merupakan sebuah slot yang akan diisi oleh elemen dari children route yang aktif.
 */

const Home = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex">
        <Navbar />
      </div>
      <div className="flex flex-grow">
        <Outlet />
      </div>
      <div className="flex">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
