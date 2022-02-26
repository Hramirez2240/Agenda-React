import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authorizationContext from "../../context/authorization/authorizationContext";
import Layout from "../Layout";

const CreateUser = () => {
    const authContext = useContext(authorizationContext);
  
    const { authenticated, createUser } = authContext;
  
    const [user, setUser] = useState({
      name: "",
      lastName: "",
      email: "",
      password: ""
    });
  
    const { name, lastName, email, password } = user;
  
    let navigate = useNavigate();
  
    useEffect(() => {
      if (authenticated) {
        navigate("/Events");
      }
    }, [authenticated, navigate]);
  
    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (name.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
        return;
      }

      console.log(user);
  
      createUser(user);
      navigate("/Events");
    };

    return (
      <Layout>
        <div style={{display: "flex", justifyContent: "center", height: "610px"}}>
        <form
          className="shadow-lg p-5 mb-5 bg-body rounded create-user"
          onSubmit={handleSubmit}>
          <h1 className="text-center">Create User</h1>

          <div className="form-container">
            <div className="form-group my-4">
              <label htmlFor="name" className="fw-bold">Name </label>
              <input
                value={name}
                onChange={handleChange}
                type="text"
                className="form-control input-create"
                name="name"
                placeholder="Enter name"
                required
              />
            </div>
      
            <div className="form-group my-4">
              <label htmlFor="lastName" className="fw-bold">Last Name </label>
              <input
                value={lastName}
                onChange={handleChange}
                type="text"
                className="form-control input-create"
                name="lastName"
                placeholder="Enter Last Name"
                required
              />
            </div>
      
            <div className="form-group my-4">
              <label htmlFor="email" className="fw-bold">Email address</label>
              <input
                value={email}
                onChange={handleChange}
                type="email"
                className="form-control input-create"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="fw-bold">Password</label>
              <input
                value={password}
                onChange={handleChange}
                type="password"
                className="form-control input-create"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
  
          
  
          <div className="d-grid center">
            <button type="submit" className="mt-4 btn btn-lg btn-primary btn-css">
              Create Account
            </button>
          </div>
        </form>
        </div>
        
      </Layout>
    );
};
export default CreateUser;