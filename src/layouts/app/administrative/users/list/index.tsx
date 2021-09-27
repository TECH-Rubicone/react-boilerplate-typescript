// outsource dependencies
import { Col, Container, Row } from 'reactstrap';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import ItemList from './list';
import Actions from './actions';
import { controller, Filters } from './controller';

// components
import Pagination from 'components/pagination';

// styles
import './styles.css';

const List = () => {
  const [
    { initialized, page, totalPages, disabled },
    { initialize, clearCtrl, updateFilters },
    isControllerSubscribed
  ] = useController(controller);

  const handlePageChange = useCallback(
    ({ selected }) => updateFilters({ page: selected } as Filters),
    [updateFilters]
  );

  useEffect(() => {
    initialize();
    return () => {
      clearCtrl();
    };
  }, [initialized, clearCtrl]);

  if (!isControllerSubscribed && !initialized) {
    return <span>Preloader</span>;
  }

  return <Container fluid>
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
          <Col xs="12">
            <Pagination disabled={disabled} forcePage={page} pageCount={totalPages} onPageChange={handlePageChange} />
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>;
};

export default memo(List);
