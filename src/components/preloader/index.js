// outsource dependencies
import _ from 'lodash';
import React from 'react';

// styles
import './style.scss';

const Index = ({ active, children, ...attr }) => !active
  ? children
  : <div className="def-preloader" {...attr}>
    <div id="SPW">
      { _.times(8, item => <div key={item} id={`SP_${item}`} className="sp" />) }
    </div>
  </div>;

export default Index;
