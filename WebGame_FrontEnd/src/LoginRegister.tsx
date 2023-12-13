import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

const LoginRegister = () => {
    return (
        <div className="container-fluid">
            <Outlet></Outlet>
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
        </div>
    )
}

export default LoginRegister