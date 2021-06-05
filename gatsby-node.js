exports.createPages = async ({actions, graphql, reporter}) => {
	const {createPage} = actions;
	const postTemplate = require.resolve('./src/templates/post.jsx');
	const tagTemplate = require.resolve('./src/templates/tag.jsx');

	const result = await graphql(`
		{
			posts: allMarkdownRemark(
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
							tags
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}

	// Create post pages
	result.data.posts.edges.forEach(({node}) => {
		createPage({
			path: `${node.frontmatter.year.padStart(2, '0')}/${node.frontmatter.month.padStart(2, '0')}/${node.frontmatter.day.padStart(2, '0')}/${node.frontmatter.slug}`,
			component: postTemplate,
			context: {
				// Additional data can be passed via context
				file: node.fileAbsolutePath,
			},
		});
	});

	// Create tag pages
	result.data.posts.edges.forEach(({node}) => {
		let tags = node.frontmatter.tags.split(',');
		tags.forEach(tag => {
			createPage({
				path: `tag/${tag}`,
				component: tagTemplate,
				context: {
					categoryRegex: `/${tag}(,|$)/igm`
				}
			})
		});
	});
}