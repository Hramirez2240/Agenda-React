import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authorizationContext from "../../context/authorization/authorizationContext";

const formStyles = {
  width: "60%",
  margin: "5rem auto",
};

const Login = () => {
  
  const authContext = useContext(authorizationContext);

  const { authenticate, LogIn} = authContext;

  
  const [user, setUser] = useState({
    email: "",
    password: "",

  });
  
  const { email, password } = user;
  
  let navigate = useNavigate();

  useEffect(() => {
    if (authenticate) {
      navigate("/events");
    }
  }, [authenticate, navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    console.log(user);
    LogIn({ email, password });
    navigate("/events");
  };

  return (
      <div className="start-form">
          <form 
      className="shadow-lg p-5 mb-5 bg-body rounded"
      style={formStyles} 
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Welcome</h1>
      <div className="form-group my-4">
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <span>
        <Link to={"new-user"}>Create a new account</Link>
      </span>

      <div className="d-grid center">
        <button id="btnLogin" type="submit" className="mt-4 btn btn-lg btn-primary btn-css">
          Login
        </button>
      </div>
    </form>
      </div>
    
  );
};

export default Login;