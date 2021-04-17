import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from '../validation/formSchema';

const initialErrors = {
  name: '',
  size: '',
  pepperoni: '',
  sausage: '',
  extraCheese: '',
  bacon: '',
  mushrooms: '',
  special: '',
};
const initialFormValues = {
  name: '',
  size: '',
  pepperoni: false,
  sausage: false,
  extraCheese: false,
  bacon: false,
  mushrooms: false,
  special: '',
};

export default function Form() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const inputChange = (evt) => {
    evt.persist();
    const newFormValues = {
      ...formValues,
      [evt.target.name]:
        evt.target.type === 'checked' ? evt.target.checked : evt.target.value,
    };
    validateChange(evt);
    setFormValues(newFormValues);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formValues]);

  const validateChange = (evt) => {
    yup
      .reach(formSchema, evt.target.name)
      .validate(evt.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [evt.target.name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [evt.target.name]: err.errors[0],
        });
      });
  };

  const submitChange = (evt) => {
    evt.preventDefault();
    axios
      .post('https://reqres.in/api/users', formValues)
      .then((res) => {
        setPost(res.data);
        console.log('success', post);
        console.log(res.data.size);
        setFormValues({
          name: '',
          size: res.data.size,
          pepperoni: false,
          ham: false,
          bacon: false,
          pineapple: false,
          special: '',
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form onSubmit={submitChange}>
        <h1 id="order">Place an Order!</h1>
        <label htmlFor="name">
          <h2>What is your name?</h2>
          <br />
          <input
            type="text"
            name="name"
            id="nameInput"
            placeholder="Name"
            value={formValues.name}
            onChange={inputChange}
          />
        </label>

        <label htmlFor="size">
          <h2>What size pizza would you like?</h2>
          <br />
          <select name="size" id="sizeInput" onChange={inputChange}>
            <option name="default" value={null}></option>
            <option name="Small" value="Sm">
              Small
            </option>
            <option name="Medium" value="Md">
              Medium
            </option>
            <option name="Large" value="Lg">
              Large
            </option>
            <option name="Xtra-Large" value="XL">
              Xtra-Large
            </option>
          </select>
        </label>
        <br />

        <div className="toppingsChecklist">
          <p>Select Toppings</p>

          <label htmlFor="pepperoni">
            <input
              type="checkbox"
              name="pepperoni"
              id="pepperoniCheckBox"
              checked={formValues.pepperoni}
              onChange={inputChange}
            />
            Pepperoni
          </label>
          <br />

          <label htmlFor="sausage">
            <input
              type="checkbox"
              name="sausage"
              id="sausageCheckBox"
              checked={formValues.sausage}
              onChange={inputChange}
            />
            Sausage
          </label>
          <br />

          <label htmlFor="extraCheese">
            <input
              type="checkbox"
              name="extraCheese"
              id="extraCheeseCheckBox"
              checked={formValues.extraCheese}
              onChange={inputChange}
            />
            Extra Cheese
          </label>
          <br />

          <label htmlFor="bacon">
            <input
              type="checkbox"
              name="bacon"
              id="baconCheckBox"
              checked={formValues.bacon}
              onChange={inputChange}
            />
            Bacon
          </label>
          <br />

          <label htmlFor="mushrooms">
            <input
              type="checkbox"
              name="mushrooms"
              id="mushroomsCheckBox"
              checked={formValues.mushrooms}
              onChange={inputChange}
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
            value={formValues.special}
            onChange={inputChange}
          />
        </label>
        <br />
        <button id="submit" disabled={buttonDisabled}>
          Submit
        </button>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </form>
    </div>
  );
}
