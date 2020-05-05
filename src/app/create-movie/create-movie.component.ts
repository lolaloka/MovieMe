import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieSService } from '../MovieServices/movie-s.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Movie } from '../@core/models';
import { isLink } from '../helpers/form-custom-validatoins';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  // private _isLink = (fc: FormControl): ValidationErrors | null => {
  //   const value = fc.value as string;
  //   if (value == '') return null;

  //   if (!value.includes('http'))
  //     return { isNotLink: true }
  //   return null;
  // }
  constructor(private _movieService: MovieSService, private _router: Router) {}
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    imgUrl: new FormControl('', [isLink])
  });
  ngOnInit(): void {}
  // create
  movieCreate() {
    if (this.form.invalid) {
      // one need to see its affect
      this.form.markAllAsTouched();
    }

    console.log(this.form.value);

    const movieToCreate = new Movie();
    movieToCreate.imgUrl = this.form.value.imgUrl;
    movieToCreate.name = this.form.value.name;

    // const movieNameToCreate = {
    //   name: this.form.value.name,
    //   imgUrl: this.form.value.imgUrl
    // } as Movie;

    this._movieService.createMovie(movieToCreate).subscribe(
      () => {
        // (Logic) =>  redirect to home Page
        // to navigaet to home page after saving the movie
        this._router.navigate(['']);

        console.log('Saved');
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
