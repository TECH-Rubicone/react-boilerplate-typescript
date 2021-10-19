export interface Pagination <T> {
  size: number
  offset: number
  pageNumber: number
  totalPages: number
  totalElements: number
  content: Array<T>
}
