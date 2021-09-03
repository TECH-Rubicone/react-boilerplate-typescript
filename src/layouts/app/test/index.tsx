// outsource dependencies
import React, { memo, useEffect, useCallback } from 'react';
import { useController } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

const App = () => {
  const [
    { data, disabled, initialized },
    { initialize, getSelf },
  ] = useController(controller);

  useEffect(() => { initialize({ some: 'probably route data for initialization' }); }, [initialize]);
  const handleGetData = useCallback(() => getSelf({ id: 1 }), [getSelf]);

  return <div className="container">
    { !initialized ? 'Loading ...' : <>
      <h3> DATA </h3>
      <p> { JSON.stringify(data) } </p>
      <button className="btn" disabled={disabled} onClick={handleGetData}>
        Get Data
      </button>
    </> }
  </div>;
};

export default memo(App);
