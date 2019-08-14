import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = ({ touched, errors }) => {
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
        <input type="submit" value="Login" />
      </Form>

      <p>
        You don't have an accout yet?
        <Link to={'/signup'}> Signup</Link>
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
        .login(values)
        .then(res => res)
        .catch(({ response }) => {
          if (response) {
            if (response.status === 404 || response.status === 401) {
              setErrors({
                password: 'Usuario o contraseña incorrectos'
              });
            }
          }
        });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    })
  })(Login)
);
