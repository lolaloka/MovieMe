import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface movieable {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class MovieSService {
  Url = 'http://localhost:3000/api/genres/';
  constructor(private _http: HttpClient) {}
  ListMovies() {
    return this._http.get<movieable[]>(this.Url);
  }
  createMovie(movieName: movieable) {
    return this._http.post<movieable>(this.Url, movieName);
    // return this._http.post(`${this.Url}/post/${movieName}`);
  }
  // Delete Movie By ID
  removeMovie(id: string) {
    return this._http.delete(id);
  }
  getMovieById(MovieId: string) {
    return this._http.get(this.Url + '/genres/' + MovieId);
  }
}
