import React from 'react';

import text from '../translations/texts_ES.json';

function CategoryMenu() {
  console.log(text.categories)
  const {
    love,
    hate,
    nostalgia,
    family,
    friendship,
    other
  } = text.categories;
  return (
    <section className="category-menu">
      <ul>
        <li>{love}</li>
        <li>{hate}</li>
        <li>{nostalgia}</li>
        <li>{family}</li>
        <li>{friendship}</li>
        <li>{other}</li>
      </ul>
    </section>
  );
}

export default CategoryMenu;
