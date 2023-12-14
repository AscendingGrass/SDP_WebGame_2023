import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

const LoginRegister = () => {
    return (
        <div className="flex w-full justify-center">
            <Outlet></Outlet>
            <div className="row justify-content-center text-center mb-3">
                <div className="col-lg-5">
                    <ul className="nav nav-tabs justify-content-center">                      
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister