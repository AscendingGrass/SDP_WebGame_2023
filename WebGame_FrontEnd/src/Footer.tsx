import { Navbar } from "@material-tailwind/react";

const Footer = ()=> {
    return (
        <Navbar className="m-auto flex justify-evenly h-15 bg-black text-white rounded-none "variant="gradient">
                <div className="col">Privacy Policy</div>
                <div className="col">Term & Condition</div>
        </Navbar>
       );
}

export default Footer