import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Helmet } from 'react-helmet';
import ThemeToggler from './themetoggler';

import * as style from './layout.module.css';
import Logo from '../assets/logo.inline.svg';
import { Menu as MenuButton } from '@material-ui/icons';

export default function Layout({
	children,
	noPadding = false,
	fullWidth = false,
}) {
	const metadata = useStaticQuery(graphql`
		query {
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
	`);

	const [menuOpen, setMenuOpen] = useState(false);
	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}
	useEffect(() => {
		window.setMenuOpen = setMenuOpen;
	}, []);

	return (
		<>
			<Helmet />
			<div className={style.wrapper}>
				<div className={style.navbar}>
					<Logo
						className={style.logo}
						onClick={() => {
							window.location.href = '/';
						}}
						alt={metadata.site.siteMetadata.title}
					/>
					<MenuButton
						className={style.menuButton}
						fontSize="large"
						onClick={toggleMenu}
					/>
				</div>
			</div>
			<div
				className={style.content}
				style={{
					padding: noPadding ? 0 : null,
				}}
			>
				<div style={{ maxWidth: fullWidth ? 'unset' : null }}>{children}</div>
			</div>
		</>
	);
}

/* <header>
	<h1><img src={headerlogo} alt={data.title} style={{width: '10em'}} /></h1>
	<nav>{data.navigation.map((obj, i) => (<span key={i}>
		<a href={obj.url}>{obj.name}</a>	{i+1 === data.navigation.length?null:<> • </>}
	</span>))}</nav>
</header> */
