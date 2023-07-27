import React from 'react';
import { graphql } from 'gatsby';

import * as style from './single.module.css';
import Layout from "../components/layout";
import Seo from "../components/seo";

// export const pageQuery = graphql`
//   query($databaseId: Int!) {
//     wpPage(databaseId: {eq: $databaseId}) {
//       title
//       content
//       author {
//         node {
//           name
//         }
//       }
//       date
//     }
//   }
// `


const PageTemplate = ({ data }) => {
  const { title, author, date, content } = data.wpPage
  return (
    <Layout>
      <Seo title={title} />
      <article className={style.article}>
        <h1>{title}</h1>
        <div>
          by {author.node.name}. Published on{' '}
          {new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </article>
    </Layout>
  )
}

export default PageTemplate