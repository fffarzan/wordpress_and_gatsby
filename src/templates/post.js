import React from "react"
import { graphql } from "gatsby"

import * as style from "./single.module.css"

import Layout from "../components/layout"
import Seo from "../components/seo";
import { Link } from "gatsby"
import Catlist from '../components/catlist'
import PostNav from '../components/postNav'

const ArticleIndex = ({ data, pageContext }) => {
  const post = data.thePost
  return (
    <Layout>
      <Seo title={post.title} />
      <article className={style.article}>     
        <Catlist postObject={post} />   
        <h1 className={style.article__title}>{post.title}</h1>
          <div className={style.article__meta}>
            by {post.author.node.name}. Published{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div
            className={style.article__content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div>
            Tagged: {' '}
            {post.tags.nodes.map((tag, index) => [
              index > 0 && ', ',
              <Link key={index} to={tag.link}>
                {tag.name}
              </Link>
            ])}
          </div>
      </article>
      <PostNav prevPost={data.prevPost} nextPost={data.nextPost} />
    </Layout>
  )
}

export default ArticleIndex

export const pageQuery = graphql`
  query($databaseId: Int!, $nextId: Int, $prevId: Int) {
    thePost: wpPost(databaseId: { eq: $databaseId }) {
      date
      databaseId
      content
      title
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          link
        }
      }
      tags {
        nodes {
          name
          link
        }
      }
    }
    nextPost: wpPost(databaseId: { eq: $nextId }) {
      title
      uri
    }
    prevPost: wpPost(databaseId: { eq: $prevId }) {
      title
      uri
    }
  }
`