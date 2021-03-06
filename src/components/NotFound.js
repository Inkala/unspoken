import React from 'react'
import { Link } from 'react-router-dom';

import text from '../translations/texts_ES.json';

const NotFound = () => {
  return (
    <section className="error-page">
      <img className="clouds left-cloud" src={process.env.PUBLIC_URL + '/img/left-clouds.png'} alt="" />
      <img className="clouds right-cloud" src={process.env.PUBLIC_URL + '/img/right-clouds.png'} alt="" />
      <h2>404</h2>
      <p>¡Ups!<br/> 
      {text.errors.not_found}</p>
      <Link to="/" className="home-button">{text.home.back}</Link>
    </section>
  )
}

export default NotFound;