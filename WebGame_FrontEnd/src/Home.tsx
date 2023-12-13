import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Outlet merupakan sebuah slot yang akan diisi oleh elemen dari children route yang aktif.
 */

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow ">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
