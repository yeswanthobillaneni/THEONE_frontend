import React from "react";
import "./CardImage.scss";
import CurrencyFormat from 'react-currency-format';

export default function CardImage(props) {
  return (
    <div class="col-12 col-sm-12 col-lg-6 col-xl-2 col-custom-xl-2">
      <div class="card card--billing">
        <div className="d-flex">
        <div>
          <div class="card__info">
            <h6>{props.title}</h6>
          </div>

          <h3>
            <strong className="fw--semibold"><CurrencyFormat thousandSeparator={true} prefix={'$'} value= {props.value} displayType={'text'}/></strong>
          </h3>
        </div>
        <div>
          <img src={props.image} alt="alt" className="image-cls"></img>
        </div>
        </div>
      </div>

    </div>
  );
}
