import { Link } from "react-router-dom";

const Register = () => {
    const handleLogin = () => {
        const storedUser = window.localStorage.getItem("user");
    
        if (storedUser) {
          window.localStorage.removeItem("user");
        } else {
          window.localStorage.setItem("user", "HAI");
        }
        console.log(window.localStorage.getItem("user"));
        
      };
  return (
    <div className="row justify-content-center text-center">
      <div className="col-lg-5">
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
          <label htmlFor="emailInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="usernameInput" placeholder="Username" />
          <label htmlFor="usernameInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
          <label htmlFor="passwordInput">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" />
          <label htmlFor="confirmPasswordInput">Confirm Password</label>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="form-label text-start">Gender</div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-check float-start">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="maleRadio" />
                <label className="form-check-label" htmlFor="maleRadio">
                  Male
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-check float-start">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="femaleRadio" />
                <label className="form-check-label" htmlFor="femaleRadio">
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <button className="btn btn-primary btn-lg" onClick={handleLogin}>
          Register Now
        </button>
        <p>
          Already have an account? <Link to={"/"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
