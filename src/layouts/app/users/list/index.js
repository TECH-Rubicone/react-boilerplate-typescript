
// outsource dependencies
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useController } from 'redux-saga-controller';

// local dependencies
import Actions from './actions';
import ItemList from './list';
import controller from './controller';

// styles
import './styles.css';

const ListPage = () => {
  const [{ initialized }, { initialize }, isControllerSubscribed] = useController(controller);
  useEffect(() => initialize(), []);
  return isControllerSubscribed && initialized && <Container fluid>
    <Row>
      <Col tag="h2">Users</Col>
    </Row>
    <Row>
      <Col xs="12">
        <Row>
          <Col xs="12" className="mb-3">
            <Actions />
          </Col>
          <Col xs="12">
            <ItemList />
          </Col>
          <Col xs="12">Pagination</Col>
        </Row>
      </Col>
    </Row>
  </Container>;
};

export default ListPage;
