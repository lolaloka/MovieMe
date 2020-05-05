import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../@core/models';


@Injectable({
  providedIn: 'root',
})
export class MovieSService {
  url = 'http://localhost:3000/api/genres/';
  constructor(private _http: HttpClient) {}
  ListMovies() {
    return this._http.get<Movie[]>(this.url);
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
