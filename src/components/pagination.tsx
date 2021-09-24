// outsource development
import React from 'react';
import cx from 'classnames';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  disabled?: boolean;
  forcePage: number;
  pageCount: number;
  onPageChange: ({ selected }: {selected: number}) => void
}

const Pagination: React.FC<PaginationProps> = ({ disabled, ...props }) => {
  return <ReactPaginate
    nextLabel="Next"
    previousLabel="Previous"
    activeClassName="active"
    pageRangeDisplayed={3}
    marginPagesDisplayed={3}
    disabledClassName="disabled"
    pageClassName={cx({ disabled }, 'page-item')}
    nextClassName={cx({ disabled }, 'page-item')}
    pageLinkClassName={'page-link cursor-pointer fz-14'}
    containerClassName="pagination mb-0 d-flex justify-content-center"
    nextLinkClassName="page-link page-link-next cursor-pointer fz-14"
    previousLinkClassName="page-link page-link-prev cursor-pointer fz-14"
    previousClassName={cx({ disabled }, 'page-item cursor-pointer')}
    {...props}
  />;
};

export default Pagination;
