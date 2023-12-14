import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Radio,
  } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [register, setRegister] = useState({
        username: '',
        password: '',
        email: '',
        gender: 'male',
      })
      const [error, setError] = useState(false);
      const [msg, setMsg] = useState('');
    
      const handleRegister = async () => {
        const body = {...register};
        const result = (await axios.post("http://localhost:3000/register", body)).data;

        setError(result.error);
        setMsg(result.msg)
        setRegister({
            username: '',
            password: '',
            email: '',
            gender: 'male'
        });   
        console.log(result);
        
      };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setRegister((prevMatch) => ({
          ...prevMatch,
          [name]: value,
        }));
    
        console.log(name + ' ' + value);
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
                    name="username"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    onChange={handleInputChange}
                    value={register.username}
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
                    name="email"
                    value={register.email}
                    onChange={handleInputChange}
                />
                <Typography variant="h6" color="blue-gray" className="">
                    Password
                </Typography>
                <Input
                    type="password"
                    size="lg"
                    placeholder="Enter your password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="password"
                    labelProps={{
                    className: "before:content-none after:content-none",
                    }}
                    value={register.password}
                    onChange={handleInputChange}
                />
                </div>
                <Typography variant="h6" color="blue-gray" className="mt-4">
                    Gender
                </Typography>
                <div className="flex gap-10">
                    <Radio 
                        name="gender" 
                        label="Male" 
                        value={"male"}
                        checked={register.gender === 'male'}
                        onChange={handleInputChange}    
                    />
                    <Radio name="gender"
                        label="Female"
                        value="female"
                        checked={register.gender === 'female'}
                        onChange={handleInputChange} 
                    />
                </div>
                <Typography variant="h6" color={`${error? "red" : "green"}`} className="mt-4">
                    {msg}
                </Typography>
                <Button className="mt-6" fullWidth
                    onClick={handleRegister}
                >
                sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to={"/login"} className="font-medium text-gray-900">
                    Log In
                </Link>
                </Typography>
            </div>
        </Card>
    )
}