import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  async function submitDetails(e) {
    e.preventDefault();

    try {
      axios.post("/login", {
        email,
        pass,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  // function Field(props) {
  //   return (
  //     <div className="col-md-6 mb-3">
  //       <label htmlFor={props.name}>{props.label}</label>
  //       <input type={props.type} className="form-control" name={props.name} />
  //     </div>
  //   );
  // }

  return (
    <form
      className="login-form"
      method="POST"
      onSubmit={(e) => {
        submitDetails(e);
        props.toggleLogin();
      }}
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            name="pass"
          />
        </div>
      </div>
      <button
        className="btn btn-dark btn-rectangular signup-button"
        type="submit"
        // onClick={() => {
        //   props.toggleLogin();
        // }}
      >
        Login
        {/* <Link to="/home" className="login-link">
          Login
        </Link> */}
      </button>
    </form>
  );
}
