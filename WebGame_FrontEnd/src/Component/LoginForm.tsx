import axios from "axios";
import { useState, useEffect } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useData } from '../DataContext';
   
export function LoginForm() {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const { state, dispatch } = useData();
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
      
      dispatch({ type: 'SET_USER', user: result.result, access_token: result.access_token});
      setError('');
      navigate("/");
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
            Username
          </Typography>
          <Input
            size="lg"
            placeholder="Enter your username"
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
        </div>
        <Button className="mt-6" fullWidth onClick={handleLogin}>
          Log In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Didn't have Account?{" "}
          <Link to={"/login/register"} className="font-medium text-gray-900">
            Register
          </Link>
        </Typography>
      </Card>
  );
}