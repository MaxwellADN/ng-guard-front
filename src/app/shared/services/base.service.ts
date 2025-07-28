import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IPagination } from '../models/pagination.interface';
import { IDatatableResponse } from '../models/datatable-response.interface';

export abstract class BaseService<T> {
  /**
   * Http request headers
   */
  public headers: HttpHeaders;
  /**
   * Api url
   */
  public apiUrl = environment.apiHost;

  /**
   * The constructor function is a function that is called when a new instance of the class is
   * created.
   * @param {HttpClient} http - HttpClient - This is the Angular HttpClient that we will use to make
   * the HTTP requests.
   * @param {string} endpoint - the endpoint of the API you want to call
   */
  constructor(public http: HttpClient, private endpoint: string) {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + <string>localStorage.getItem('token'),
    })
    this.apiUrl += this.endpoint;
  }

  /**
   * This function sends an HTTP GET request to an API endpoint with pagination parameters and
   * returns an observable of a datatable response.
   * @param {IPagination} pagination - IPagination - an interface that defines the
   * properties of pagination such as page number, page size, search term, sort direction, and sort
   * field.
   * @returns An Observable of type IDatatableResponse<T> is being returned.
   */
  public search(pagination: IPagination): Observable<IDatatableResponse<T>> {
    return this.http.get<IDatatableResponse<T>>(this.apiUrl
      + `/paginate?page=${pagination.page}&size=${pagination.pageSize}&searchTerm=${pagination.searchTerm}&sortDirection=${pagination.sortDirection}&sortField=${pagination.sortField}`,
      {
        headers: this.headers
      })
  }

  public searchAll(pagination: IPagination): Observable<IDatatableResponse<T>> {
    return this.http.get<IDatatableResponse<T>>(this.apiUrl
      + `/all/paginate?page=${pagination.page}&size=${pagination.pageSize}&searchTerm=${pagination.searchTerm}&sortDirection=${pagination.sortDirection}&sortField=${pagination.sortField}`,
      {
        headers: this.headers
      })
  }
}