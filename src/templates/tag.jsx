import React from 'react'
import {graphql} from 'gatsby'
import Header from '../components/header'
import * as styles from '../components/blog-feed.module.css'

const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Template({data}) {
	return (<>
		<Header />
		{JSON.stringify(data)}
	</>)
}

export const pageQuery = graphql`
	query($categoryRegex: String!) { 
		allMarkdownRemark(
			filter: {
				frontmatter: {
					tags: {regex: $categoryRegex}
				}
			}
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
				}
			}
		}
	}
`