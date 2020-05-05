import { Component, OnInit } from '@angular/core';
import { MovieSService } from '../MovieServices/movie-s.service';
import { Movie } from '../@core/models';
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent implements OnInit {
  defaultImgUrl = `https://www.thebristolarms.com.au/wp-content/uploads/2018/03/img-not-found.png`;
  movies: Movie[];
  constructor(private MovieService: MovieSService) {

  }
  ngOnInit(): void {
    this.loadMovies()
  }

  removeMovie(id: string) {
    const confirmation = window.confirm('هل تريد حذف الفيلم؟');

    if (confirmation) {
      this.MovieService.removeMovie(id)
      .subscribe(
        (deletedResult) => {
          this.loadMovies();
        },
        (err) => {
          console.error(err);
        }
      )
    }
  }

  loadMovies() {
    this.MovieService.ListMovies().subscribe(
      (res) => {
        this.movies = res;
      },
      (err) => { console.error(err); }
    );
  }
}
