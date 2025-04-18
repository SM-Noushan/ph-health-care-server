import { IPaginationOptions } from "../../interface/pagination";

export interface IAdminFilterRequest extends IPaginationOptions {
  name?: string;
  email?: string;
  contactNumber?: string;
  searchTerm?: string;
}
