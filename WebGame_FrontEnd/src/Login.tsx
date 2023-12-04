import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = window.localStorage.getItem("user");

    if (storedUser) {
      window.localStorage.removeItem("user");
    } else {
      window.localStorage.setItem("user", "HAI");
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="row justify-content-center text-center">
      <div className="col-lg-5">
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <br />
        <br />
        <button className="btn btn-primary" onClick={handleLogin}>
          Login Now
        </button>
        <p>
          Don't have an account? <Link to={"register"}>Sign Up Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
