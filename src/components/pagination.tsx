// outsource development
import React, { useCallback } from 'react';
import ReactPagination from 'rc-pagination';

// styles
import 'rc-pagination/assets/index.css';

interface PaginationProps {
  total: number
  current: number
  disabled?: boolean
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ disabled, current, total, onPageChange }) => {
  const handlePageChange = useCallback((page: number) => onPageChange(page - 1), [onPageChange]);
  return <ReactPagination
    total={total}
    current={current + 1}
    defaultCurrent={1}
    disabled={disabled}
    onChange={handlePageChange}
  />;
};

export default Pagination;
