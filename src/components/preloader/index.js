// outsource dependencies
import _ from 'lodash';
import React from 'react';
import { Box } from '@mui/material';

// styles
import './style.scss';

const Preloader = ({ active, children, ...attr }) => !active
  ? children
  : <Box className="def-preloader" {...attr}>
    <div id="SPW">
      { _.times(8, item => <div key={item} id={`SP_${item}`} className="sp" />) }
    </div>
  </Box>;

export default Preloader;
