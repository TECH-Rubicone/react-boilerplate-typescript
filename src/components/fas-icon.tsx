// outsource dependencies
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconName, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faLink, faExclamationTriangle, faChevronRight, faSortAmountUp, faCheck, faTrash, faUserCog, faSpinner, faTimes, faDownload, faCircle, faInfoCircle, faGripVertical, faPalette, faTshirt, faBars, faUsersCog, faUsers, faSignOutAlt, faHome, faBoxOpen, faChevronUp, faSearch, faSort, faSortAmountDown, faPlus, faCaretUp, faCog, faTrashAlt, faPencilAlt, faTools } from '@fortawesome/free-solid-svg-icons';

// NOTE production connected icons make sure in the repo was not present development (unused) icons
library.add(
  faCog,
  faHome,
  faLink,
  faBars,
  faSort,
  faPlus,
  faTimes,
  faCheck,
  faTools,
  faTrash,
  faUsers,
  faSearch,
  faTshirt,
  faCircle,
  faUserCog,
  faBoxOpen,
  faCaretUp,
  faPalette,
  faSpinner,
  faDownload,
  faUsersCog,
  faTrashAlt,
  faChevronUp,
  faPencilAlt,
  faInfoCircle,
  faSignOutAlt,
  faChevronRight,
  faGripVertical,
  faSortAmountUp,
  faSortAmountDown,
  faExclamationTriangle,
);

interface IFFasIcon {
  icon: IconName;
  color?: string;
  size?: SizeProp;
  className?: string;
}

export const FasIcon: React.FC<IFFasIcon> = ({ icon, ...attr }) => <FontAwesomeIcon
  icon={['fas', icon]}
  {...attr}
/>;

export default memo(FasIcon);

