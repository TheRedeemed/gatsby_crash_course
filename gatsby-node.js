// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }


const path = require('path')

exports.createPages = ({actions, graphql}) => {
  const { createPage } = actions
  const postTemplate = path.resolve('src/templates/blog-post.js');
  return graphql(`
  {
    allMarkdownRemark {
    edges {
        node {
        id
        frontmatter {
            author
            date
            path
            title
            }
        }
      }
    }
  }  
  `).then(res => {
    if(res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })     
    })
  })
}
