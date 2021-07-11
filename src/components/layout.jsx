import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeToggler from './themetoggler';
import { Helmet } from 'react-helmet';
import Drawer from '@material-ui/core/Drawer';

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

	return (
		<>
			<Helmet />
			{/* Navbar */}
			<div className={style.navbarWrapper}>
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
						onClick={(_) => setMenuOpen(!menuOpen)}
					/>
				</div>
			</div>
			{/* Menu */}
			<div
				className={style.menu}
				style={menuOpen ? null : {
					boxShadow: 'none',
					transform: 'translateX(18rem)'
				}}
			>
				<h1>Hello</h1>
			</div>
			{/* Content area */}
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
