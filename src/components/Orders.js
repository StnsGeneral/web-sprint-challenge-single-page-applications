import React from 'react';
import Toppings from './Toppings';

export default function Order(props) {
  const { values } = props;
  return (
    <div className="order container">
      <h4>
        Thanks for the order {values.first_name} {values.last_name}
      </h4>
      <p>Your pizza is being prepared soon.</p>
      <p>We will email you at {values.email} when it is on it's way.</p>
      <div className="order-information">
        <h4>Your order for reference.</h4>
        <p>
          Please double check all the information and let us know if there are
          any changes that need to be made.
        </p>
        <div className="order-status">
          <p>Size: {values.size}</p>
          <Toppings toppings={values.toppings} />
          <p>Special Instructions: {values.special}</p>
        </div>
      </div>
    </div>
  );
}
