// outsource libraries
import React, { memo } from 'react';
import { Container } from 'reactstrap';

// local dependencies
import App from './app';

const Layouts = () => {
  return <Container>
    <h1>Layouts</h1>
    <App />
  </Container>;
};

export default memo(Layouts);
