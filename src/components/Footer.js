import React from 'react';

import { ReactComponent as Instagram} from '../svg/instagram.svg';
import { ReactComponent as Facebook} from '../svg/facebook.svg';
import { ReactComponent as Twitter} from '../svg/twitter.svg';

function Footer() {
  return (
    <footer>
      <section className="social">
        <Instagram />
        <Facebook />
        <Twitter />
      </section>
      <p>@Copyright Unspoken 2019</p>
    </footer>
  );
}

export default Footer;
