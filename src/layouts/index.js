import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../utilities/tachyons.min.css';

const TemplateWrapper = ({ children }) => (
  <div className="avenir">
    <Helmet
      title="Kenneth Ofosu - Software Engineer"
      meta={[
        { name: 'description', content: 'Software Engineer based in New York, NY' },
        { name: 'keywords', content: '"gatsby", "web developer", "software engineer ", "portfolio", "react"' },
      ]}
    />
      <div className="pb5 pb6-m pb6 -l">    
        <Header border="bb" color="black-70" />
      {children()}
      </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


