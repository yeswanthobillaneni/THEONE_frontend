import React from "react";
import "./Card.scss";
import CurrencyFormat from 'react-currency-format';

export default function Card(props) {
  return (
    <div class="col-12 col-sm-12 col-lg-6 col-xl-2 col-custom-xl-2">
      <div class="card card--billing">
        <div class="card__info">
          <h6>{props.title}</h6>
        </div>
        <h3>
          <strong className="fw--semibold"><CurrencyFormat thousandSeparator={true} prefix={'$'} value= {props.value} displayType={'text'}/></strong>
        </h3>
      </div>
    </div>
  );
}
