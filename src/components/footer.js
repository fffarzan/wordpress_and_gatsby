import React from 'react'

import FooterNav from './footerNav'

const Footer = () => (
  <footer 
    style={{
      marginTop: `var(--space-5)`,
      fontSize: `var(--font-sm)`,
    }}
  >
    <FooterNav />
    © {new Date().getFullYear()} &middot; Bulit with
    {` `}
    <a href='https://gatsbyjs.com'>Gatsby</a>
  </footer>
)

export default Footer