import { SortDirection } from "../directives/sortable.directive";

export interface IPagination {
  page: number;
  pageSize: number
  searchTerm?: string;
  sortDirection?: SortDirection;
  sortField?: string;
}