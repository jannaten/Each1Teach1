import React from 'react';
import { PaginationItem } from '../../styles';
import { ChevronDoubleLeft, ChevronLeft } from 'react-bootstrap-icons';
import { ChevronDoubleRight, ChevronRight } from 'react-bootstrap-icons';

export default function PaginationComponent({
  pageSize,
  itemsCount,
  currentPage,
  onPageChange
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <>
      {pagesCount !== 1 && (
        <nav className='d-flex flex-row justify-content-center flex-wrap'>
          <ul className='pagination d-flex flex-wrap'>
            <PaginationItem
              className='page-item'
              disabled={currentPage === 1}
              aria-label='first page button'
              onClick={() => onPageChange(1)}>
              <ChevronDoubleLeft />
            </PaginationItem>
            <PaginationItem
              className='page-item'
              disabled={currentPage === 1}
              aria-label='previous page button'
              onClick={() => onPageChange(currentPage - 1)}>
              <ChevronLeft />
            </PaginationItem>
            {pages.map((page, index) => (
              <PaginationItem
                key={index}
                className='page-item'
                active={page === currentPage}
                onClick={() => onPageChange(page)}>
                {page}
              </PaginationItem>
            ))}
            <PaginationItem
              className='page-item'
              aria-label='next page button'
              disabled={pages.length === currentPage}
              onClick={() => onPageChange(currentPage + 1)}>
              <ChevronRight />
            </PaginationItem>
            <PaginationItem
              className='page-item'
              aria-label='last page button'
              disabled={pages.length === currentPage}
              onClick={() => onPageChange(pages.length)}>
              <ChevronDoubleRight />
            </PaginationItem>
          </ul>
        </nav>
      )}
    </>
  );
}
