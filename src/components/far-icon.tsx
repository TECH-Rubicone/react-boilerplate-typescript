// outsource dependencies
import React, { memo } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// local dependencies
import { IconProps } from 'components/fa-icon';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faCopy
);

export const FarIcon: React.FC<IconProps> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['far', icon]}
  {...attr}
/>;

export default memo(FarIcon);
