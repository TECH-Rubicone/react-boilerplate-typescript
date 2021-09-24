// outsource dependencies
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IconName, library, SizeProp} from '@fortawesome/fontawesome-svg-core';
import { faCopy, faListAlt, faSquare, faCheckSquare, faMinusSquare, faIdBadge, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faCopy,
  faSquare,
  faIdBadge,
  faIdBadge,
  faListAlt,
  faListAlt,
  faCheckCircle,
  faTimesCircle,
  faCheckSquare,
  faMinusSquare,
);
interface IFFarIcon {
  icon: IconName;
  color?: string;
  size?: SizeProp;
  className?: string;
}

export const FarIcon: React.FC<IFFarIcon> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['far', icon]}
  {...attr}
/>;

export default memo(FarIcon);
