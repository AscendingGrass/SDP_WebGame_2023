import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

const LoginRegister = () => {
    const testBackEnd =async () => {
        const test = await axios.get("http://localhost:3000");
        console.log(test);
        
    }
    // localStorage.removeItem("user");
    // localStorage.removeItem("access_token");
    testBackEnd();
    return (
        // <div className="flex justify-center">
        //     <div className="basis-5/12">

        //     </div>
        // </div>
        <div className="container-fluid">
            <div className="row justify-content-center text-center mb-3">
                <div className="col-lg-5">
                    <ul className="nav nav-tabs justify-content-center">
                       
                        <li className="nav-item col-lg-6">
                            <NavLink to={"/"} className={(state)=>{
                                return state.isActive? "fw-bold nav-link active" : "nav-link active"
                            }}>Login</NavLink>
                        </li>
                        <li className="nav-item col-lg-6">
                            <NavLink to={"/register"} className={(state)=>{
                                return state.isActive? "fw-bold nav-link active" : "nav-link active"
                            }}>Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default LoginRegister