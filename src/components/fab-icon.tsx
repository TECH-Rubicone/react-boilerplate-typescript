// outsource dependencies
import React, { memo } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// local dependencies
import { IconProps } from 'components/fa-icon';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faInstagram,
);

export const FabIcon: React.FC<IconProps> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['fab', icon]}
  {...attr}
/>;
export default memo(FabIcon);
