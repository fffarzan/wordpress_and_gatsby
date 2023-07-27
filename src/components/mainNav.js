import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import UniversalLink from "../utils/UniversalLink"

import * as style from './mainNav.module.css'
import { FlatListToHierarchical } from '../utils/FlatListToHierarchical'

const MenuLoop = ({ menuItems }) => (
  <ul>
    {menuItems.map((menuItem, index) => (
      <li 
        key={index}
        className={menuItem.routes.length > 0 ? 'has-submenu' : undefined}
      >
        <UniversalLink to={menuItem.path} activeClassName="current-page">
          {menuItem.title}
        </UniversalLink>
        {menuItem.routes.length > 0 && <MenuLoop menuItems={menuItem.routes} />}
      </li>
    ))}
  </ul>
)

const MainNav = () => {
  const wpMenu = useStaticQuery(graphql`
    {
      allWpMenuItem(
        sort: { fields: order, order: ASC }
        filter: { 
          menu: { node: { slug: { eq: "all-pages" } } } 
          parentDatabaseId: { eq: 0 }
        }
      ) {
        nodes {
          id
          title: label
          path
          target
          parent: parentId
        }
      }
    }
  `)

  const headerMenu = FlatListToHierarchical(wpMenu.allWpMenuItem.nodes, {
    idKey: 'id',
    childrenKey: 'routes',
    parentKey: 'parent'
  })

  return (
    <nav className={style.mainnav}>
      {headerMenu.length > 0 && <MenuLoop menuItems={headerMenu} />}
    </nav>
  )
}

export default MainNav