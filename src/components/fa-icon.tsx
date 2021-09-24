// outsource dependencies
import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// local dependencies
export { FasIcon } from './fas-icon';
export { FarIcon } from './far-icon';
export { FabIcon } from './fab-icon';

// configure
export interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {icon: IconName}

export default FontAwesomeIcon;
