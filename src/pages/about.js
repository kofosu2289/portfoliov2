import React from 'react'
import PageTitle from '../components/PageTitle/pageTitle'
import Link from 'gatsby-link'

const About = () => (
	<div className="center mw8 mt4 pv4 ph3">
		<PageTitle title="About" />
		<p className="db lh-copy w-100 black-70 fw1 f4 f3-m mt0">
			I am an analytical Software Engineer who is passionate about transforming
			abstract ideas into tangible products and applications. As both a Veteran
			and Developer, I thrive in demanding situations that require strong
			discipline and attention to detail. I seek the opportunity to work for a
			mission-driven organization that takes a curious yet agile approach in the
			products they create. IF you are looking for a software engineer that
			suits your needs, please{' '}
			<Link to="/contact" className="link black">
				<strong>contact me</strong>
			</Link>
			.
		</p>
    </div>
)

export default About
