import React, { useContext, useState } from "react";
import TextField from "../../Components/Common/TextField/TextField";
import Button from "../../Components/Common/Button/Button";
// import "./ForgotPassword.scss";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { forgotPasswordValues } from "../../Utils/initialValues";
import { URL } from "../../Utils/url";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export default function ForgotPasswordLink(props) {
  const location = useLocation();
  const navigate = useNavigate();
  // API for forgot password
  const loginHandler = async (formikValues) => {
    try {
      const response = await fetch(`${URL}/users/forgotPasswordLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: 12345678,
        },
        body: JSON.stringify({
          email: formikValues.email,
          // "password": formikValues.password
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success(data.message);
      } else if (data.status === 401) {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className="background-image-test height-issue">
      <Formik
        initialValues={forgotPasswordValues}
        onSubmit={(formikValues) => loginHandler(formikValues)}
      >
        {(props) => (
          <Form>
            <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
              <div class="container py-4">
                <div class="row justify-content-center pt-6">
                  <div class="col-lg-6 mb-lg-0 mb-4">
                    <div class="card z-index-2">
                      <div class="card-body p-6 pt-4 pb-0">
                        <h6 class="ms-2 mb-0 text-center h-white headtext mb-3">
                          Forgot Password
                        </h6>
                        <div class="row justify-content-center ">
                          <div class="col-md-12  p-4 pt-3 mb-0 ">
                            <div>
                              <div class="row pb-0 mb-4 justify-content-center">
                                <div class="col-md-8 col-sm-12">
                                  <label for="Name" class="textlogin">
                                    Email
                                  </label>
                                  <Field
                                    type="text"
                                    name="email"
                                    // placeholder="Email"
                                    component={TextField}
                                    className={"form-control inputtype"}
                                  />
                                </div>
                              </div>

                              <div class=" justify-content-center text-center pt-2 pb-0">
                                <Button
                                  type="submit"
                                  className="btn btns"
                                  text={"Submit"}
                                />
                              </div>
                              <div class="pt-1 pb-2 new-container">
                                <p class="accounts pb-1">
                                  Already have an account?
                                  <a
                                    className="accounts"
                                    onClick={() => navigate("/login")}
                                  >
                                    Sign-in here
                                  </a>
                                </p>
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
    // <div className="d-flex align-items-center flex-column justify-content-center auth-container">
    //   <span className="font-weight-bold txt--white fw--medium mb--20 heading">
    //     Forgot Password
    //   </span>
    //   <Formik
    //     initialValues={ forgotPasswordValues }
    //     onSubmit={(formikValues) => loginHandler(formikValues)}

    //   >
    //     {(props) => (
    //       <Form>
    //         <Field
    //           type="text"
    //           name="email"
    //           placeholder="Email"
    //           component={TextField}
    //         />
    //         {/* <Field
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           component={TextField}
    //         />
    //         <Field
    //               type="password"
    //               name="password"
    //               placeholder="Re-Enter Password"
    //               component={TextField}
    //             /> */}

    //         <Button
    //           type="submit"
    //           className="btn btn-success"
    //           text={location.pathname === "/" ? "Sign In" : "Submit"}
    //         />
    //       </Form>
    //     )}
    //   </Formik>

    //   <span className="txt--white mt--10">
    //     {location.pathname === "/"
    //       ? "Don't have an account?"
    //       : "Already Signed up?"}{" "}
    //     <Link to={location.pathname === "/" ? "/register" : "/"}>
    //       {location.pathname === "/" ? "Register here" : "Login here"}
    //     </Link>
    //   </span>
    //   < ToastContainer />
    // </div>
  );
}
