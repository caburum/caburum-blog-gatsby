import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import headerlogo from '../../static/headerlogo.png'

const HeaderRender = ({data}) => (
	<header>
		<h1><img src={headerlogo} alt={data.title} style={{width: '10em'}} /></h1>
		<nav>{data.navigation.map((obj, i) => (<span key={i}>
			<a href={obj.url}>{obj.name}</a>	{i+1 === data.navigation.length?null:<> • </>}
		</span>))}</nav>
	</header>
)

export default function Header() {
	return (
		<StaticQuery query={graphql`
			query SiteQuery {
				site {
					siteMetadata {
						title
						navigation {
							name
							url
						}
					}
				}
			}
		`}
		render={data => <HeaderRender data={data.site.siteMetadata} />} />
	)
}