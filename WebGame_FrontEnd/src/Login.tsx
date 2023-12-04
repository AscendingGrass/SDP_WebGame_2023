/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginForm } from "./Component/LoginForm";

const Login = () => {
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
