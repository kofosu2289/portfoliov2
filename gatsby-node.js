/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
if (node.internal.type === `MarkdownRemark` && /.*\/blogs\/.*/.test(node.fileAbsolutePath)) {
      const slug = createFilePath({ node, getNode, basePath: `blogs` })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  };

exports.onCreatePage = async ({ graphql, page, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
      if (page.path.match(/^\/$/)) {
        page.layout = "landingPage";
  
        // Update the page.
        createPage(page);
      }
            
      resolve();
    });
  };

  exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex:"/blogs/.*$/"} }) {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
        `
    ).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/blog-post.js'),
                context: {
                    // Data passed to context is available in page queries as GraphQL variables.
                    slug: node.fields.slug
                }
            })
        });
      })
      resolve()
      });
}

 // You can delete this file if you're not using it