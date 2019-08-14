import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth.js';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Signup = ({ touched, errors }) => {
  return (
    <>
      <Form>
        <label htmlFor="username">Username:</label>
        <Field id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
        <label htmlFor="password">Password:</label>
        <Field id="password" type="password" name="password" />
        {touched.password && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <input type="submit" value="Signup" />
      </Form>

      <p>
        Already have account?
        <Link to={'/login'}> Login</Link>
      </p>
    </>
  );
};

export default withAuth(
  withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || '',
        password: ''
      };
    },
    handleSubmit(values, { props, setErrors, ...bag }) {
      props
        .signup(values)
        .then(res => res)
        .catch(({ response }) => {
          if (response && response.status === 422) {
            setErrors({
              username: 'Este usuario ya existe'
            });
          }
        });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    })
  })(Signup)
);
