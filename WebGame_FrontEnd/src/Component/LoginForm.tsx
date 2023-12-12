import axios from "axios";
import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
   
  export function LoginForm() {
    const [login, setLogin] = useState({
      username: '',
      password: '',
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      const body = {...login};
      const result = (await axios.post("http://localhost:3000/login", body)).data;
      
      if(result.error){
        console.log(result);
        setError(result.msg);
      }else{
        console.log(result);
        
        localStorage.setItem("user", JSON.stringify({
          ...result.result
        }));
        localStorage.setItem("access_token", result.access_token);
        setError('');
        navigate('/home');
      }
      
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLogin((prevMatch) => ({
          ...prevMatch,
          [name]: value,
      }));
      console.log(name + " " + value);
      
    };
    return (
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <div className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
              name="password"
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="red" className="-mb-3">
                {error}
            </Typography>
          </div>
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </div>
      </Card>
    );
  }