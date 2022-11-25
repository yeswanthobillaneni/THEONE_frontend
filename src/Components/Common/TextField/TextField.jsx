import React from "react";
import "./TextField.scss";
import { getIn } from "formik";
export default function TextField(props) {
  const error = getIn(props.form?.errors, props.field.name);
  const touch = getIn(props.form?.touched, props.field.name);
  return (
    <div className="textfield-container d-flex flex-column align-items-start mb--20 position-relative">
      <label>{props.placeholder}</label>
      {/* <span
        className="position-absolute"
        style={{
          top: "16px",
          marginLeft: "5px",
          display: props.display ? "block" : "none",
          color:'white'
        }}
      >
        +65
      </span> */}
      <input
        {...props.field}
        type={props.type}
        disabled={props.disabled}
        className={props.className}
        maxlength={props.maxlength}
        {...props}
        style={({ color: "white !important" }, props.style)}
      />
      {touch && error ? <span className="error-txt">{error}</span> : null}
    </div>
  );
}
