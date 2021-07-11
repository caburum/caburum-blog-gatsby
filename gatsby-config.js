/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Cablog',
    description: 'A cool blog',
    author: 'Caburum',
    siteUrl: 'http://localhost:8000',
    navigation: [
      { name: 'Google', url: 'https://google.com' },
      { name: 'Trash', url: 'https://bing.com' },
      { name: 'Sus', url: 'https://duckduckgo.com' },
      { name: 'Google', url: 'https://goo.gl' },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
								author
							}
						}
					}
				`,
        feeds: [
          {
            output: '/rss.xml',
            title: 'Example Feed',
            query: `{
							allMarkdownRemark(
								sort: { order: DESC, fields: [frontmatter___year] }
								limit: 1000
							) {
								edges {
									node {
										frontmatter {
											year
											month
											day
											slug
											title
											tags
											snippet
										}
										fileAbsolutePath
									}
								}
							}
						}`,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  date: new Date(
                    edge.node.frontmatter.year,
                    edge.node.frontmatter.month - 1,
                    edge.node.frontmatter.day
                  ),
                  url:
                    site.siteMetadata.siteUrl +
                    `/${edge.node.frontmatter.year.padStart(
                      2,
                      '0'
                    )}/${edge.node.frontmatter.month.padStart(
                      2,
                      '0'
                    )}/${edge.node.frontmatter.day.padStart(2, '0')}/${
                      edge.node.frontmatter.slug
                    }`,
                  guid: `${edge.node.frontmatter.year.padStart(
                    2,
                    '0'
                  )}/${edge.node.frontmatter.month.padStart(
                    2,
                    '0'
                  )}/${edge.node.frontmatter.day.padStart(2, '0')}/${
                    edge.node.frontmatter.slug
                  }`,
                  description: edge.node.frontmatter.snippet,
                  categories: edge.node.frontmatter.tags.split(','),
                  author: site.siteMetadata.author,
                });
              });
            },
          },
        ],
      },
    },
  ],
};
