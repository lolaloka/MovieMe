import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieSService, movieable } from '../MovieServices/movie-s.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  constructor(private _movieService: MovieSService, private _router: Router) {}
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });
  ngOnInit(): void {}
  // create
  movieCreate() {
    if (this.form.invalid) {
      // one need to see its affect
      this.form.markAllAsTouched();
    }

    const movieNameToCreate = {
      name: this.form.value.name,
    } as movieable;
    console.log(movieNameToCreate);
    this._movieService.createMovie(movieNameToCreate).subscribe(
      () => {
        // (Logic) =>  redirect to home Page
        // console.log(res);

        console.log('Saved');
        // to navigaet to home page after saving the movie
        this._router.navigate(['']);
      },
      (err) => {
        // Error Handling  || How tO show error Message
        console.error(err);
      }
    );
  }

  // delete
  removeMovie() {}
}

// form = new FormGroup({
//   name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
// });
