/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "./Component/RegisterForm";

const Register = () => {
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
    <div className="grid place-items-center">
      <RegisterForm/>
    </div>
  );
}

export default Register;
