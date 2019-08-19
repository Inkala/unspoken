import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import withAuth from '../hoc/withAuth.js';
import text from '../translations/texts_ES.json';

const Signup = ({ touched, errors }) => {
  const {
    username,
    password,
    already,
    signup,
    login
  } = text.signup
  return (
    <section className="signup-form">
      <Form>
        <label className="label" htmlFor="username">{username}:</label>
        <Field className="input" id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
        <label className="label" htmlFor="password">{password}:</label>
        <Field className="input" id="password" type="password" name="password" />
        {touched.password && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <input className="btn" type="submit" value={signup} />
      </Form>

      <p className="bottom-text">
        {already}
        <Link to={'/login'}> {login}</Link>
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
              username: text.errors.exists
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
