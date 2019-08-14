import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth.js';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Signup = ({ touched, errors }) => {
  return (
    <section className="signup-form">
      <Form>
        <label className="label" htmlFor="username">Username:</label>
        <Field className="input" id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
        <label className="label" htmlFor="password">Password:</label>
        <Field className="input" id="password" type="password" name="password" />
        {touched.password && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <input className="btn" type="submit" value="Signup" />
      </Form>

      <p className="bottom-text">
        Already have account?
        <Link to={'/login'}> Login</Link>
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
