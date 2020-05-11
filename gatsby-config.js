module.exports = {
  siteMetadata: {
    title: 'Kenneth Ofosu - Software Engineer',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`
      }
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-react-helmet'
  ],
};
