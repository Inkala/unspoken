import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = ({ touched, errors }) => {
  return (
    <section className="signup-form">
      <Form>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <Field className="input" id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
        <label className="label" htmlFor="password">
          Password:
        </label>
        <Field
          className="input"
          id="password"
          type="password"
          name="password"
        />
        {touched.password && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <input className="btn" type="submit" value="Login" />
      </Form>

      <p className="bottom-text">
        You don't have an accout yet?
        <Link to={'/signup'}> Signup</Link>
      </p>
    </section>
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
