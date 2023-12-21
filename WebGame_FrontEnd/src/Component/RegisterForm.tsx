// @ts-nocheck

import {
    Card,
    Input,
    // Checkbox,
    Button,
    Typography,
    Radio,
  } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');

    const handleRegister = async (data) => {
        const body = {...data};
        const result = (await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, body)).data;

        setError(result.error);
        setMsg(result.msg)
        reset();
      };
    
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(handleRegister)} className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
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
                        {...register("username")}
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
                        {...register("email")}
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
                        {...register("password")}
                    />
                    <Typography variant="h6" color="blue-gray" className="">
                        Gender
                    </Typography>
                    <div className="flex gap-10">
                        <Radio 
                            label="Male" 
                            value={"male"}
                            {...register("gender")}
                            checked={true}
                        />
                        <Radio
                            label="Female"
                            value="female"
                            {...register("gender")}
                        />
                    </div>
                </div>
                <Typography variant="h6" color={`${error? "red" : "green"}`} className="mt-4">
                    {msg}
                </Typography>
                <Button className="mt-6" fullWidth type="submit">
                sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to={"/login"} className="font-medium text-gray-900">
                    Log In
                </Link>
                </Typography>
            </form>
        </Card>
    )
}