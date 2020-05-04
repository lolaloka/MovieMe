import { Component, OnInit } from '@angular/core';
import { MovieSService } from '../MovieServices/movie-s.service';
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent implements OnInit {
  movies;
  constructor(private MovieService: MovieSService) {
    this.MovieService.ListMovies().subscribe((res) => {
      this.movies = res;
    }),
      (err) => {
        console.error(err);
      };
  }

  ngOnInit(): void {}
}
