import React from "react";
import CardImage from "../../Sass/img/Credit Card_Monochromatic.svg";

export default function CardActivate() {

  
  return (

      <div className="container py-4">
        <div className="row justify-content-center pt-6">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <span className="navbar-brand">
              <img src={CardImage} alt="" className="img-fluid" />
            </span>
            <p className="text-center activetext pt-4">
              Your KYC is being processed, once approved you will receive your card for activation in 4 - 5 weeks
            </p>
          </div>
        </div>
        {/* <p className="notetext text-center pt-4">
          Note: Please wait patiently and we will notify you on the next steps
        </p> */}
      </div>

  );
}
