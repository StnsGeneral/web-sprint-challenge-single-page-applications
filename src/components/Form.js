import React from 'react';

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  return (
    <div>
      <form className="form container" onSubmit={onSubmit}>
        <h1 id="order">Place an Order!</h1>
        <label htmlFor="name">
          <h2>What is your name?</h2>
          <br />
          <input
            type="text"
            name="first_name"
            id="firstNameInput"
            placeholder="First Name"
            value={values.first_name}
            onChange={onChange}
          />
          <input
            type="text"
            name="last_name"
            id="lastNameInput"
            placeholder="Last Name"
            value={values.last_name}
            onChange={onChange}
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter an email address"
            value={values.email}
            onChange={onChange}
          />
        </label>

        <label htmlFor="size">
          <h2>What size pizza would you like?</h2>
          <br />
          <select name="size" id="sizeInput" onChange={onChange}>
            <option name="default" value={null}></option>
            <option name="Small" value="Small">
              Small
            </option>
            <option name="Medium" value="Medium">
              Medium
            </option>
            <option name="Large" value="Large">
              Large
            </option>
            <option name="Xtra-Large" value="XL">
              Xtra-Large
            </option>
          </select>
        </label>
        <br />

        <div className="toppingsChecklist">
          <h3>Select Toppings</h3>

          <label htmlFor="pepperoni">
            <input
              type="checkbox"
              name="pepperoni"
              id="pepperoniCheckBox"
              checked={values.pepperoni}
              onChange={onChange}
            />
            Pepperoni
          </label>
          <br />

          <label htmlFor="sausage">
            <input
              type="checkbox"
              name="sausage"
              id="sausageCheckBox"
              checked={values.sausage}
              onChange={onChange}
            />
            Sausage
          </label>
          <br />

          <label htmlFor="extraCheese">
            <input
              type="checkbox"
              name="extraCheese"
              id="extraCheeseCheckBox"
              checked={values.extraCheese}
              onChange={onChange}
            />
            Extra Cheese
          </label>
          <br />

          <label htmlFor="bacon">
            <input
              type="checkbox"
              name="bacon"
              id="baconCheckBox"
              checked={values.bacon}
              onChange={onChange}
            />
            Bacon
          </label>
          <br />

          <label htmlFor="mushrooms">
            <input
              type="checkbox"
              name="mushrooms"
              id="mushroomsCheckBox"
              checked={values.mushrooms}
              onChange={onChange}
            />
            Mushrooms
          </label>
          <br />
        </div>

        <label htmlFor="Special Instructions">
          <h2>Any special instructions?</h2>
          <br />
          <textarea
            name="special"
            id="special"
            placeholder="Type instructions here..."
            value={values.special}
            onChange={onChange}
          />
        </label>
        <br />
        <button id="submit" disabled={disabled}>
          Place Order
        </button>
        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.size}</div>
          <div>{errors.email}</div>
        </div>
      </form>
    </div>
  );
}
