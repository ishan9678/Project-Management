import React, { useState } from "react";
import axios from "axios";

export default function SignupForm(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  async function submitDetails(e) {
    e.preventDefault();

    try {
      await axios.post("/signup", {
        fname,
        lname,
        email,
        phone,
        pass,
        cpass,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // function Field(props) {
  //   return (
  //     <div className="col-md-6 mb-3">
  //       <label htmlFor={props.name}>{props.label}</label>
  //       <input
  //         type={props.type}
  //         onChange={(e) => {
  //           setDetails((prevDetails) => ({
  //             ...prevDetails,
  //             [props.name]: e.target.value,
  //           }));
  //         }}
  //         className="form-control"
  //         name={props.name}
  //         value={details[props.name] || ""}
  //       />
  //     </div>
  //   );
  // }

  return (
    <form
      className="signup-form"
      action="POST"
      onSubmit={(e) => {
        submitDetails(e);
        props.toggleLogin();
      }}
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setFname(e.target.value);
            }}
            name="fname"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setLname(e.target.value);
            }}
            name="lname"
          />
        </div>
      </div>
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
        <div className="col-md-6 mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            name="phone"
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
        <div className="col-md-6 mb-3">
          <label htmlFor="cpass">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setCpass(e.target.value);
            }}
            name="cpass"
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
        Sign Up
      </button>
    </form>
  );
}
