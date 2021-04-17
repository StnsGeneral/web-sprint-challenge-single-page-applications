import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required('Name is a required field.'),
  size: yup.string().required('Please select a size.'),
  pepperoni: yup.boolean().defined(),
  sausage: yup.boolean().defined(),
  mushrooms: yup.boolean().defined(),
  extraCheese: yup.boolean().defined(),
  special: yup.boolean().notRequired(),
  bacon: yup.boolean().defined(),
});
