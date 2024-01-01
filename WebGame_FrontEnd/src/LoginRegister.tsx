import { Outlet } from "react-router-dom";
import NavBarFun from "./Navbar";

const LoginRegister = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex">
                <NavBarFun></NavBarFun>
            </div>
            <div className="flex flex-grow w-full h-full justify-center">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default LoginRegister