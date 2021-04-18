import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import * as yup from 'yup';
import schema from './validation/formSchema';
import axios from 'axios';
import Order from './components/Orders';

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  size: '',
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
  const history = useHistory();

  const formSubmit = () => {
    const newOrder = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      size: formValues.size,
      toppings: [
        'pepperoni',
        'sausage',
        'extraCheese',
        'bacon',
        'mushrooms',
      ].filter((topping) => formValues[topping]),
      special: formValues.special.trim(),
    };
    postNewOrder(newOrder);
    history.push('/order-confirmation');
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
        setOrders(res.data);
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
          <Link to="/help">
            <button className="form-button">Help</button>
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
        <Route exact path="/order-confirmation">
          <Order values={orders} />
        </Route>
      </Switch>
    </>
  );
};
export default App;
