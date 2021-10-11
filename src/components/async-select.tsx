// outsource dependencies
import { toast } from 'react-toastify';
import React, { useCallback, useEffect, useState } from 'react';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import FSelect, { SelectProps } from './select';

interface FAsyncSelectProps extends SelectProps {
  loadingText: React.ReactNode
  loadOptions: () => Promise<Array<AnyObject>>
}

export const FAsyncSelect: React.FC<FAsyncSelectProps> = props => {
  const { loadOptions, ...attr } = props;
  const [list, setList] = useState<Array<AnyObject>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoadOptions = useCallback(async () => {
    try {
      const data = await loadOptions();
      if (loading) {
        setList(data);
        setLoading(false);
      }
    } catch ({ message }) {
      toast(String(message), { delay: 500, theme: 'light', toastId: 'ERROR', closeOnClick: true, });
    }
  }, [loadOptions, loading]);

  useEffect(() => {
    handleLoadOptions();
    return () => { setLoading(false); };
  }, [handleLoadOptions]);

  return <FSelect {...attr} options={list} loading={loading} />;
};

FAsyncSelect.defaultProps = {
  loading: true,
  getFieldValue: value => value,
};
