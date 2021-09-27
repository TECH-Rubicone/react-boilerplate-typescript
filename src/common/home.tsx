// outsource dependencies
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// local dependencies

// constants
import * as ROUTES from 'constants/routes';

const Home = () => <Container>
  <Row>
    <Col>
      <h1 className="pt-5 text-center">Welcome</h1>
      <Link to={ROUTES.ADMINISTRATIVE_USERS_LIST.LINK()} className="nav-link">User List</Link>
    </Col>
  </Row>
</Container>;

export default memo(Home);
