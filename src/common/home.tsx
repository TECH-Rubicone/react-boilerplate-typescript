// outsource dependencies
import React, { memo } from 'react';
import { Col, Container, Row } from 'reactstrap';

const Home = () => <Container>
  <Row>
    <Col>
      <h1 className="pt-5 text-center">Welcome</h1>
    </Col>
  </Row>
</Container>;

export default memo(Home);
