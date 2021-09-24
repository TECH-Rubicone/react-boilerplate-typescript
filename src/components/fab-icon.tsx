// outsource dependencies
import React, { memo } from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library, IconName, SizeProp} from '@fortawesome/fontawesome-svg-core';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faInstagram,
);

interface IFFabIcon {
  icon: IconName;
  color?: string;
  size?: SizeProp;
  className?: string;
}
export const FabIcon: React.FC<IFFabIcon> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['fab', icon]}
  {...attr}
/>;
export default memo(FabIcon);
