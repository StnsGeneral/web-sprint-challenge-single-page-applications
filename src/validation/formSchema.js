import * as yup from 'yup';

export default yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Name must be longer than.')
    .required('Please enter your first name.'),
  last_name: yup
    .string()
    .min(2, 'Name must be longer')
    .required('Please enter your last name.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.'),
  size: yup.string().required('Please select a size.'),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  mushrooms: yup.boolean(),
  extraCheese: yup.boolean(),
  special: yup.string(),
  bacon: yup.boolean(),
});
