import React from 'react';
import PropTypes from 'prop-types';

import classes from './pageTitle.module.css';

const PageTitle = (props) => {
  const float = props.align === "right" ? "fr-l ml5-l" : "fl-l mr5-l";
  return (
    <div className={[classes.PageTitle, float, "mv2 mv4-ns tc v-mid h5 w5 black-70 mb3"].join(' ')}>
      <div className="h-100 w-100 relative">
        <div className="absolute dib w-90" style={{border:"1px solid white", height: '90%', top: '5%', left: '5%'}}>
          <h1 className="dib absolute fw3 white ma0" style={{top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>{props.title}</h1>
        </div>
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  align: PropTypes.string,
}

export default PageTitle;