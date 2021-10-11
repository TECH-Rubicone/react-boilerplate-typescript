// outsource dependencies
import FSelect, { SelectProps } from './select';
import React, { useEffect, useState } from 'react';

// local dependencies
// interfaces
import { AnyObject } from '../interfaces/common';

interface FASelectProps extends SelectProps {
  loading?: boolean
  loadingText: React.ReactNode
  onLoadOptions: () => Promise<Array<AnyObject>>
}

export const FASelect: React.FC<FASelectProps> = props => {
  const { onLoadOptions, ...attr } = props;
  const [list, setList] = useState<Array<AnyObject>>([]);

  useEffect(() => {
    onLoadOptions().then(data => { setList(data); }).catch(({ message }) => console.error(message));
  }, [onLoadOptions]);

  return <FSelect
    {...attr}
    options={list}
  />;
};

FASelect.defaultProps = {
  loading: true,
  getFieldValue: value => value,
};
