import { Outlet } from "react-router-dom";
import NavBarFun from "./Navbar";

const LoginRegister = () => {
    return (
        <div className="flex flex-col w-full h-full justify-center">
            <NavBarFun></NavBarFun>
            <Outlet></Outlet>
        </div>
    )
}

export default LoginRegister