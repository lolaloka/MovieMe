import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../@core/models';

interface IRowsAndCount<T> {
  rows: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieSService {

  url = 'http://localhost:3000/api/genres/';

  constructor(private _http: HttpClient) {}

  ListMovies(sortBy = 'name', searchTerm?: string, pageSize = 3, pageIndex = 1) {
    let httpParam = new HttpParams()
    .append('sortBy', sortBy)
    .append('limit', pageSize.toString())
    .append('page', pageIndex.toString());

    if (searchTerm) {
      httpParam = httpParam.append('searchTerm', searchTerm);
    }

    // return this._http.get<Movie[]>(`${this.url}?sortBy=${sortBy}${ searchTerm ? `&searchTerm=${searchTerm}` : ''}`);
    return this._http.get<IRowsAndCount<Movie>>(this.url, {
      params: httpParam
    });
  }
  createMovie(movieName: Movie) {
    return this._http.post<Movie>(this.url, movieName);
    // return this._http.post(`${this.Url}/post/${movieName}`);
  }
  // Delete Movie By ID
  removeMovie(id: string) {
    return this._http.delete<Movie>(this.url + id);
  }
  getMovieById(movieId: string) {
    return this._http.get<Movie>(`${this.url}${movieId}`);
  }

  updateMovie(movieId: string, value: Partial<Movie>) {
    return this._http.put<Movie>(`${this.url}${movieId}`, value)
  }
}
