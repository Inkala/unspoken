import React from 'react';

import text from '../translations/texts_ES.json';

function CategoryMenu(props) {
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
        <li onClick={()=>{
          props.changeCategory('love')
        }}>{love}</li>
        <li onClick={()=>{
          props.changeCategory('hate')
        }}>{hate}</li>
        <li onClick={()=>{
          props.changeCategory('nostalgia')
        }}>{nostalgia}</li>
        <li onClick={()=>{
          props.changeCategory('family')
        }}>{family}</li>
        <li onClick={()=>{
          props.changeCategory('friendship')
        }}>{friendship}</li>
        <li onClick={()=>{
          props.changeCategory('other')
        }}>{other}</li>
      </ul>
    </section>
  );
}

export default CategoryMenu;
