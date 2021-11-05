// outsource development
import React, { useCallback } from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
  page: number
  total: number
  disabled?: boolean
  totalPages: number
  size: number | string
  onPageChange: (page: number) => void
  onSizeChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const SIZES = [10, 15, 30, 50];

const Pagination: React.FC<PaginationProps> = props => {
  const { size, total, page, disabled, totalPages, onPageChange, onSizeChange } = props;
  const handlePageChange = useCallback((event, page: number) => onPageChange(page), [onPageChange]);
  return <TablePagination
    page={page}
    count={total}
    component="div"
    rowsPerPage={Number(size)}
    rowsPerPageOptions={SIZES}
    onPageChange={handlePageChange}
    onRowsPerPageChange={onSizeChange}
  />;
};

export default Pagination;
