import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [register, setRegister] = useState({
        username: '',
        password: '',
      })
      const navigate = useNavigate();
    
      const handleRegister = async () => {
        const body = {...register};
        const result = await axios.post("http://localhost:3000", body);
        console.log(result);
        
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegister((prevMatch) => ({
            ...prevMatch,
            [name]: value,
        }));
        console.log(name + " " + value);
        
      };
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <div className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="">
                    Username
                </Typography>
                <Input
                    size="lg"
                    placeholder="Enter your username"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                <Typography variant="h6" color="blue-gray" className="">
                    Email
                </Typography>
                <Input
                    size="lg"
                    placeholder="Enter your email"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />
                <Typography variant="h6" color="blue-gray" className="">
                    Password
                </Typography>
                <Input
                    type="password"
                    size="lg"
                    placeholder="Enter your password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                />

                </div>
                <Checkbox
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                    >
                    I agree the
                    <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                    >
                        &nbsp;Terms and Conditions
                    </a>
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth>
                sign up
                </Button>
                already have an account?
                <NavLink to="/login" className="font-medium text-gray-900">
                    Log in
                </NavLink>   
            </div>
        </Card>
    )
}