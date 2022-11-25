import React from "react";
import CardImage from "../../Sass/img/Credit Card_Monochromatic.svg";
export default function CardIsActivate() {
  return (

      <div className="container py-4">
        <div className="row justify-content-center pt-4">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <span className="navbar-brand">
              <img src={CardImage} alt="" className="img-fluid" />
            </span>
            <p className="text-center activetext pt-2">
             Your activation is being processed           
            </p>
          </div>
        </div>
        <p className="notetext text-center pt-4">
       Refresh this page periodically to check your card Activation Status
        </p>
      </div>
 
  );
}
