import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'
import * as styles from './blog-feed.module.css'

const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const BlogFeedRender = ({data}) => (
	<div className={styles.feed}>
    {data.map((node) => {
      let post = node.node.frontmatter;
      let url = `${post.year.padStart(2, '0')}/${post.month.padStart(2, '0')}/${post.day.padStart(2, '0')}/${post.slug}`;
      return (<div className={styles.feedbox} key={url}>
        <h2>{post.title}</h2>
        {post.snippet}
        <span className={styles.feedboxfooter}>Posted on {monthNames[post.month]} {post.day}, {post.year} in {post.tags}<br />
        <Link to={url}>Read more</Link></span>
      </div>)
    })}
  </div>
)

export default function BlogFeed() {
	return (
		<StaticQuery query={graphql`
			query BlogPosts {
				allMarkdownRemark {
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
						}
					}
				}
			}
		`}
		render={data => <BlogFeedRender data={data.allMarkdownRemark.edges} />} />
	)
}