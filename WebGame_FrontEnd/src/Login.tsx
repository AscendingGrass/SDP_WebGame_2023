/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import {useState} from "react";
import axios from "axios";
import { LoginForm } from "./Component/LoginForm";

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleLogin = async () => {
    const body = {...login};
    const result = await axios.post("http://localhost:3000", body);
    console.log(result);
    
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
    <div className="grid place-items-center">
      <LoginForm/>
    </div>
    // <div className="grid gap-5 place-items-center ">
    //   <div className="w-72">
    //     <Input label="Username" name="username" onChange={handleInputChange} crossOrigin={undefined} />
    //   </div>
    //   <div className="w-72">
    //     <Input label="Password" name="password" onChange={handleInputChange} crossOrigin={undefined}/>
    //   </div>
    //   <div className="w-72">
    //     <Button variant="filled" color="blue"
    //       onClick={handleLogin}
    //     >Login</Button>
    //   </div>
    //   <p>
    //     Don't have an account? <Link className="text-blue-700" to={"register"}>Sign Up Now</Link>
    //   </p>
    // </div>
  );
};

export default Login;
