import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Resume from '../../assets/koResume.pdf'

import classes from './Header.module.css'

const Header = props => {
  return (
    <nav className={[props.border, "dt w-100 mw8 center"].join(' ')}>
			<div className="db dtc-1 dtc-m w2 v-mid pa3">
				<Link
					to="/"
					className={[
						props.color,
						'dib f2 pa1 ba black-70 dn no-underline grow-large border-box',
					].join(' ')}
				>
					KO
				</Link>
			</div>
			<div className="db dtc-l dtc-m v-mid tl-s tr-m tr-l pa3-l">
				<Link
          className="f5 f4-m f4-l fw4 hover-yellow no-underline black-70 dib pv2 ph3"
          activeClassName={classes.active}
					to="/about"
				>
					About
				</Link>
				<Link
          className="f5 f4-m f4-l fw4 hover-yellow no-underline black-70 dib pv2 ph3"
          activeClassName={classes.active}
					to="/projects"
				>
					Projects
				</Link>
				<Link
          className="f5 f4-m f4-l fw4 hover-yellow no-underline black-70 dib pv2 ph3"
          activeClassName={classes.active}
					to="/blog"
				>
          Blog
				</Link>
        <Link
          className="f5 f4-m f4-l fw4 hover-yellow no-underline black-70 dib pv2 ph3"
          onClick={() => {
            window.open(Resume, '_blank').focus()
          }}
        >
          Resume
        </Link>
				<Link
          className="f5 f4-m f4-l fw4 hover-yellow no-underline black-70 dib pv2 ph3"
          activeClassName={classes.active}
					to="/contact"
				>
					Contact
				</Link>
			</div>
		</nav>
	)
}

Header.propTypes = {
  color: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
}

export default Header
