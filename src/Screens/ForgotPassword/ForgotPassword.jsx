import React, { useContext, useState } from "react";
import TextField from "../../Components/Common/TextField/TextField";
import Button from "../../Components/Common/Button/Button";
import "./ForgotPassword.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
// import { forgotPasswordValues } from "../../Utils/initialValues";
import { URL } from "../../Utils/url";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
export default function ForgotPassword() {
  const location = useLocation();
  var pagename= location.pathname.split('/').pop();
  
  const forgotPasswordValues = {
    email: pagename?pagename:"",
    password: "",
  };
  // API for forgot password
  const loginHandler = async (formikValues) => {
    

    try {
      const response = await fetch(`${URL}/users/forgotPassword/${formikValues.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 12345678,
        },
        body: JSON.stringify({
          // "email": formikValues.email,
          "password": formikValues.password
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success(data.message)
      }
      else if (data.status === 401) {
        toast.error(data.message)
      }

    } catch (err) {

    } finally {

    }

  };

  return (
    <div className="d-flex align-items-center flex-column justify-content-center auth-container">
      <span className="font-weight-bold txt--white fw--medium mb--20 heading">
        Forgot Password
      </span>
      <Formik
        initialValues={forgotPasswordValues}
        onSubmit={(formikValues) => loginHandler(formikValues)}

      >
        {(props) => (
          <Form>
            <Field
              type="text"
              name="email"
              placeholder="Email"
              component={TextField}
            disabled={pagename?true:false}
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              component={TextField}
            />
            <Field
              type="password"
              name="password"
              placeholder="Re-Enter Password"
              component={TextField}
            />

            <Button
              type="submit"
              className="btn btn-success"
              text={location.pathname === "/" ? "Sign In" : "Submit"}
            />
          </Form>
        )}
      </Formik>

      <span className="txt--white mt--10">
        {location.pathname === "/"
          ? "Don't have an account?"
          : "Already Signed up?"}{" "}
        <Link to={location.pathname === "/" ? "/register" : "/login"}>
          {location.pathname === "/" ? "Register here" : "Login here"}
        </Link>
      </span>
      < ToastContainer />
    </div>
  );
}
