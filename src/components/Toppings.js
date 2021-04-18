import React from 'react';

export default function Toppings(props) {
  const { toppings } = props;
  if (!toppings) return <p>No toppings selected.</p>;

  return (
    <div className="toppingsList">
      <p>Selected Toppings:</p>
      <ul>
        {toppings.map((topping) => {
          return <li>{topping}</li>;
        })}
      </ul>
    </div>
  );
}
