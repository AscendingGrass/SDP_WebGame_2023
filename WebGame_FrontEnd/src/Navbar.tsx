import { NavLink, Link } from "react-router-dom";

/**
 * Untuk membuat navigasi, kita dapat menggunakan Link dan NavLink
 * Fungsi Link dan NavLink adalah memindahkan route active ke tujuan "to"
 * Link dan NavLink menghalau refresh server side seperti yang dilakukan <a>
 */


const Navbar = () => {
  return (
   <div className="container-fluid">
    <div className="row py-2 bg-dark text-white text-center align-items-center">
      <div className="col-lg-2">
        {
          window.localStorage.getItem("user") && 
          <div className="row h3">
            <div className="text-white float-start">Hello, </div>
            <div className="text-primary float-start">Yurtan</div>
          </div>
        }
        {
          !window.localStorage.getItem("user") && 
          <div>&nbsp;</div>
        }
      </div>
      <div className="col-lg-8">
        <div className="row justify-content-between">
          <div className="col">
            <NavLink className={(state)=> {
              return state.isActive? "fw-bold text-white" : "text-white"
            }} to={"/"}>Home</NavLink>
          </div>
          <div className="col">
            <NavLink className={(state)=> {
                return state.isActive? "fw-bold text-white" : "text-white" 
              }} to={"/leaderboard"}>Leaderboard</NavLink>
          </div>
          <div className="col">
            <NavLink className={(state)=> {
                return state.isActive? "fw-bold text-white" : "text-white"
              }} to={"/setting"}>Setting </NavLink>
          </div>
          {
            window.localStorage.getItem("user") && 
            <div className="col">
            <NavLink className={(state)=> {
                return state.isActive? "fw-bold text-white" : "text-white"
              }} to={"/news"}>News </NavLink>
          </div>
          }
        </div>
      </div>
      <div className="col-lg-2">
        <button className="btn btn-primary px-4" style={{borderRadius: "25px"}} >
          <Link to={"/game"} className="text-white">Play</Link>
        </button>
      </div>
    </div>
   </div>
  );
};

export default Navbar;
