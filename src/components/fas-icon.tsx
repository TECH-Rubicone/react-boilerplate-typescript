// outsource dependencies
import React, { memo, FC } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretDown, faSearch, faCog, faHome, faPencilAlt, faPlus, faSort, faSortAmountDown, faSortAmountUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// local dependencies
import { IconProps } from 'components/fa-icon';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faCog,
  faHome,
  faSort,
  faPlus,
  faTimes,
  faSearch,
  faTrashAlt,
  faCaretDown,
  faPencilAlt,
  faSortAmountUp,
  faSortAmountDown,
);

export const FasIcon: FC<IconProps> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['fas', icon]}
  {...attr}
/>;

export default memo(FasIcon);

