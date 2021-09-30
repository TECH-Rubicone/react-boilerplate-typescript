
// outsource dependencies
import { Location } from 'history';
import { Button } from 'reactstrap';
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// services
import _ from 'services/lodash.service';

export interface Props {
  isActive: (location: Location, link: string) => boolean,
  to: string
  children: React.ReactNode
}

const RouterButton = ({ isActive, to, ...attr } : Props) => {
  const location = useLocation<Location>();
  const active = _.isFunction(isActive) && isActive(location, to);
  return <Button tag={Link} to={to} active={active} {...attr} />;
};
RouterButton.defaultProps = {
  color: 'link',
  isActive: (location: Location, link: string) => (!_.isString(link)
    ? false
    : (new RegExp(link.split('?')[0], 'i')).test(location.pathname))
};
export default memo(RouterButton);
