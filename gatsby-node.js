const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data: { pageQuery, postQuery, catQuery, tagQuery } } = await graphql(`
    {
      pageQuery: allWpPage {
        nodes {
          databaseId
          uri
        }
      }
      postQuery: allWpPost(sort: {fields: date, order: ASC}) {
        edges {
          node {
            databaseId
            uri
          }
          next {
            databaseId
          }
          previous {
            databaseId
          }
        }
      }
      catQuery: allWpCategory {
        nodes {
          databaseId
          uri
          name
          posts {
            nodes {
              databaseId
              title
            }
          }
        }
      }
      tagQuery: allWpTag {
        nodes {
          databaseId
          uri
          name
          posts {
            nodes {
              databaseId
              title
            }
          }
        }
      }
    }
  `)
  const pages = pageQuery.nodes
  const posts = postQuery.edges
  const categories = catQuery.nodes
  const tags = tagQuery.nodes
  pages.forEach(({ uri, databaseId }) => {
    createPage({
      path: uri,
      component: require.resolve("./src/templates/page.js"),
      context: {
        databaseId: databaseId
      },
    })  
  })
  posts.forEach(({ node, next, previous }) => {
    createPage({
      path: `posts${node.uri}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        databaseId: node.databaseId,
        nextId: next ? next.databaseId : null,
        prevId: previous ? previous.databaseId : null
      },
    })
  })
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 4,
    pathPrefix: '/posts',
    component: require.resolve("./src/templates/posts.js"),
  })
  categories.map(({ posts, uri, databaseId, name }) => {
    paginate({
      createPage,
      items: posts.nodes,
      itemsPerPage: 4,
      pathPrefix: uri,
      component: require.resolve("./src/templates/categories.js"),
      context: {
        catId: databaseId,
        catName: name
      }
    })
  })  
  tags.map(({ posts, uri, databaseId, name }) => {
    paginate({
      createPage,
      items: posts.nodes,
      itemsPerPage: 4,
      pathPrefix: uri,
      component: require.resolve("./src/templates/tags.js"),
      context: {
        tagId: databaseId,
        tagName: name
      }
    })
  }) 
}
