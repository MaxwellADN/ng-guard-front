import { SortDirection } from "../directives/sortable.directive";
import { IUser } from "./user.interface";

export interface IPagination { 
  createdBy: string | IUser;
  size: number;
  skip: number;
  searchTerm: string;
  sortDirection: SortDirection;
  sortField: string;
}