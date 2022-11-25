import React, { useContext, useState } from "react";
import TextField from "../../Components/Common/TextField/TextField";
import Button from "../../Components/Common/Button/Button";
import "./Auth.scss";
import { useNavigate, useLocation } from "react-router";
import { Formik, Field, Form } from "formik";
import {
  loginInitialValues,
  RegisterInitialValues,
} from "../../Utils/initialValues";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import { URL } from "../../Utils/url";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setCookie } from "../../Utils/cookieHandling";
export default function Auth() {
  const roleContext = useContext(UserRoleContext);
  const navigate=useNavigate();
  const location = useLocation();
  

  // api for login and register
  const loginHandler = async (formikValues) => {
    if (location.pathname === "/login") {
      try {
        const response = await fetch(`${URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: 12345678,
          },
          body: JSON.stringify({
            email: formikValues.email,
            password: formikValues.password,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          
          const updateContext = roleContext.updateContext;
          setCookie("token", data.token);
          setCookie("email", formikValues.email);
          setCookie("address", data.address);

          updateContext({ isLoggedIn: true });
          toast.success(data.message);
          if (location.pathname === "/login") {
            navigate("/dashboard");
          }
        } else {
          
          toast.error(data.message);
        }
      } catch (err) {
      } finally {
      }
    } else if (location.pathname === "/register") {
      
      if (formikValues.password !== formikValues.reenter) {
        toast.error("Password and Re-enter password should be same");
        return;
      }
      try {
        const response = await fetch(`${URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: 12345678,
          },
          body: JSON.stringify({
            email: formikValues.email,
            password: formikValues.password,
            // "username": formikValues.username,
            // "role": formikValues.role
          }),
        });

        const data = await response.json();
        if (data.status === 200) {
          
          navigate("/login");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
      } finally {
      }
    }
  };

  return (
    <div className="background-image-test height-issue">
    <Formik
      initialValues={
        location.pathname === "/register"
          ? RegisterInitialValues
          : loginInitialValues
      }
      onSubmit={(formikValues) => loginHandler(formikValues)}
    >
      {(props) => (
        <Form>
    
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
              <div className="container py-4">
                <div className="row justify-content-center pt-6">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="card z-index-2">
                      <div className="card-body p-md-6 p-sm-0 pt-4 pb-0">
                        <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
                          {location.pathname === "/register"
                            ? "Register"
                            : "Login"}
                        </h6>
                        <div className="row justify-content-center ">
                          <div className="col-md-12  p-4 pt-3 mb-0 ">
                            <div>
                              <div className="row pb-0 mb-4 justify-content-center">
                                <div className="col-md-8 col-sm-12">
                                  <label for="Name" className="textlogin">
                                    Email
                                  </label>
                                  <Field
                                    type="text"
                                    name="email"
                                    // placeholder="Email"
                                    component={TextField}
                                    className={"form-control inputtype"}
                                  />
                                  <label for="Name" className="textlogin">
                                    Password
                                  </label>
                                  <Field
                                    type="password"
                                    name="password"
                                    className={"form-control inputtype"}
                                    // placeholder="Password"
                                    component={TextField}
                                  />
                                  {location.pathname === "/register" ? (
                                    <>
                                      <label for="Name" className="textlogin">
                                        Re-Enter Password
                                      </label>
                                      <Field
                                        type="password"
                                        name="reenter"
                                        className={"form-control inputtype"}
                                        // placeholder="Password"
                                        component={TextField}
                                      />
                                    </>
                                  ) : null}
                                </div>
                                <div className="w-100"></div>

                                <div className="col-md-8 col-sm-12 pb-0">
                                  <p
                                    className="forgotpass pb-1"
                                    onClick={() =>
                                      navigate("/forgotpassword")
                                    }
                                  >
                                    Forgot Password
                                  </p>
                                </div>
                              </div>

                              <div className=" justify-content-center text-center pt-2 pb-0">
                                <Button
                                  type="submit"
                                  className="btn btns"
                                  text={
                                    location.pathname === "/login"
                                      ? "Login"
                                      : "Register"
                                  }
                                />
                              </div>
                              <div className="pt-1 pb-2 new-container">
                                {location.pathname === "/register" ? (
                                  <p className="accounts pb-1">
                                    Already have an account?{" "}
                                    <a
                                      className="accounts"
                                      onClick={() => navigate("/login")}
                                    >
                                      Login here
                                    </a>
                                  </p>
                                ) : (
                                  <p className="accounts pb-1">
                                    Don't have an account?{" "}
                                    <a
                                      className="accounts"
                                      onClick={() => navigate("/register")}
                                    >
                                      Register Now
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          
        </Form>
      )}
    </Formik>
    </div>
  );
}
