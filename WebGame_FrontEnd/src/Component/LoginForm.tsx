/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import axios from "axios";
import { useState, useEffect } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Alert,
  } from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useData } from '../DataContext';
import { useForm } from "react-hook-form";
   
export function LoginForm() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { state, dispatch } = useData();
  const [ error, setError ] = useState(false);
  const [ msg, setMsg ] = useState("")
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    const body = {...data};

    if(body.username == "" || body.password == ""){
      setError(true);
      setMsg("Semua Field Wajib diisi!");
      return;
    }
    
    const result = (await axios.post(`${backendURL}/login`, body)).data;
    
    setError(result.error);
    setMsg(result.msg);

    if(!result.error){
      dispatch({ type: 'SET_USER', user: result.result, access_token: result.access_token});
      setError('');
      navigate("/");
    }
  
    reset();
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Log In
      </Typography>
      <div className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
        <form className="mb-1 flex flex-col gap-6" onSubmit={handleSubmit(handleLogin)}>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Username
          </Typography>
          <Input
            size="lg"
            placeholder="Enter your username"
            className=" !border-blue-gray-200 focus:!border-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("username")}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="Enter your password"
            className=" !border-blue-gray-200 focus:!border-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
              }}
            {...register("password")}
          />
          {
            error &&
            <Alert className="border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500 py-2 ">
              {msg}
            </Alert>
          }
          <Button className="" type="submit">
            Log In
          </Button>
          <Typography color="gray" className="text-center font-normal">
            Didn't have Account?{" "}
            <Link to={"/login/register"} className="font-medium text-gray-900">
              Register
            </Link>
          </Typography>
        </form>
      </div>
    </Card>
  );
}