import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import * as yup from 'yup';
import schema from './validation/formSchema';
import axios from 'axios';

const initialFormErrors = {
  name: '',
  email: '',
  size: '',
  special: '',
};

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  size: '',
  pepperoni: false,
  sausage: false,
  extraCheese: false,
  bacon: false,
  mushrooms: false,
  special: '',
};

const initialDisabled = true;
const initialOrders = [];

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [orders, setOrders] = useState(initialOrders);

  const formSubmit = () => {
    const newOrder = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      size: formValues.size,
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      extraCheese: formValues.extraCheese,
      bacon: formValues.bacon,
      mushrooms: formValues.mushrooms,
      special: formValues.special.trim(),
    };
    postNewOrder(newOrder);
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ' ',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const postNewOrder = (newOrder) => {
    axios
      .post(`https://reqres.in/api/users`, newOrder)
      .then((res) => {
        setOrders([...orders, res.data]);
        setFormValues(initialFormValues);
        console.log(setOrders);
      })
      .catch((err) => {
        setFormValues(initialFormValues);
        console.log(err);
      });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div className="nav-links">
          <Link to="/">
            <button className="home-button">Home</button>
          </Link>
          <Link to="/pizza">
            <button className="form-button">Order Here</button>
          </Link>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pizza">
          <Form
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
      </Switch>
    </>
  );
};
export default App;
