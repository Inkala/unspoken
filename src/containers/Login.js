import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import withAuth from '../hoc/withAuth';
import text from '../translations/texts_ES.json';

const Login = ({ touched, errors }) => {
  const {
    username,
    password,
    no_account,
    signup,
    login
  } = text.signup

  return (
    <section className="signup-form">
      <Form>
        <label className="label" htmlFor="username">
          {username}:
        </label>
        <Field className="input" id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
        <label className="label" htmlFor="password">
          {password}:
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
        <input className="btn" type="submit" value={login} />
      </Form>

      <p className="bottom-text">
        {no_account}
        <Link to={'/signup'}> {signup}</Link>
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
                password: text.errors.wrongInfo
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
