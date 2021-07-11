import React from 'react'
import {useState, useEffect} from 'react'
import Layout from '../components/layout'
import BlogFeed from '../components/blog-feed'
const axios = require('axios');

export default function Home() {
	const [num, setNum] = useState(0);
	const [cyQuote, setCyQuote] = useState('');
	useEffect(() => {
    axios.get('https://cyquotes.ccreativecnd.repl.co/api').then(result => setCyQuote(result.data.quote));
  }, [])
	return (
		<Layout>
			<h1>Hello world!</h1>
			<p>Num: {num}</p>
			<button onClick={() => {setNum(num + 1)}}>Add one to the num</button>
			<p>{cyQuote}</p>
			<BlogFeed />
		</Layout>
	)
}