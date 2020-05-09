import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { filter, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { from, fromEvent, Observable } from 'rxjs';

import { MovieSService } from '../MovieServices/movie-s.service';
import { Movie } from '../@core/models';
import { debounce } from '../helpers/functions';
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInputElment')
  searchInputElement: ElementRef<HTMLInputElement>;

  defaultImgUrl = `https://www.thebristolarms.com.au/wp-content/uploads/2018/03/img-not-found.png`;
  movies: Movie[];
  sortByField = 'name';
  searchTerm: string;


  debounce = debounce;
  sortByFields = [
    { label: 'Name', value: 'name' },
    { label: 'Image url', value: 'imgUrl' },
    { label: 'Id', value: '_id' },
  ]
  constructor(private movieService: MovieSService) {

  }
  ngOnInit(): void {
    this.loadMovies()


    const Q = 'What is your name?';
    const ANSWER = 'Ahmed';

    // const answer = (answer) => new Promise((resolve, reject) => {
    //   if (answer == ANSWER) resolve(true);
    //   else reject(false)
    // })
    const answer = (answer) => new Observable((observer) => {
      if (answer == ANSWER) {
        observer.next(true);
        setInterval(() => observer.next(true), 1000);
      }
      else
        observer.error(false);
    });

    answer('Ahmed')
    .subscribe(
      (res) => console.log('congratulations', res),
      (err) => console.error('OPSS!!')
    )
    // // promise - array
    // from(pro)
    // .pipe(
    //   filter((res) => res < 2)
    // )
    // .subscribe((res) => console.log(res));

  }

  ngAfterViewInit() {
    // this.searchInputElement.nativeElement.addEventListener('input', debounce(500, (e) => {
    //   const searchText = e.target.value;
    //   this.searchTerm = searchText;
    //   this.getMovieList(this.sortByField, this.searchTerm);
    // }));

    const subscription = fromEvent(this.searchInputElement.nativeElement, 'input')
    .pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(x => x.length > 0),
      debounceTime(200),
      distinctUntilChanged()
    )
    .subscribe((term) => {
      this.searchTerm = term;
      this.getMovieList(this.sortByField, this.searchTerm);
    });
    // subscription.unsubscribe();

  }

  removeMovie(id: string) {
    const confirmation = window.confirm('هل تريد حذف الفيلم؟');

    if (confirmation) {
      this.movieService.removeMovie(id)
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

  setSortBy(e) {
    this.sortByField = e;
    // load the movies again but with the new sort by field
    this.getMovieList(this.sortByField, this.searchTerm)
    // and if there's a search term exist in the search input element
    // call the endpoint with the new sort field and the exisitng search text.

  }


  loadMovies() {
    this.movieService.ListMovies().subscribe(
      (res) => {
        this.movies = res;
      },
      (err) => { console.error(err); }
    );
  }

  getMovieList(sortBy: string, term: string) {
    this.movieService.ListMovies(sortBy, term)
    .subscribe(
      (res) => {
        this.movies = res;
      },
      (err) => { console.error(err); }
    );
  }
}
