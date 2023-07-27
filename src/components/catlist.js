import React from 'react'
import { Link } from 'gatsby'

import * as style from './catlist.module.css'

const Catlist = ({ postObject }) => (
  <div className={style.article__catlist}>
    {postObject.categories.nodes.map((category, index) => [
      index > 0 && ', ',
      <Link key={index} to={category.link}>
        {category.name}
      </Link>,
    ])}
  </div>
)

export default Catlist