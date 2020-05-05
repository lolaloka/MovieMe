import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MovieSService } from '../MovieServices/movie-s.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../@core/models';
import { isLink } from '../helpers/form-custom-validatoins';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css'],
})
export class UpdateMovieComponent implements OnInit {

  httpError: string;

  isEmail = (fc: FormControl): ValidationErrors | null => {
    const value = fc.value as string;
    if (!value.includes('@'))
      return { isNotEmail: true }

    if (value.split('@').length > 2)
      return { isNotEmail: true }

    return null;
  }


  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      imgUrl: new FormControl('', [isLink])
    }
  );

  movie: Movie;
  constructor(
    private _movService: MovieSService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }
  ngOnInit(): void {
    this._movService.getMovieById(this._route.snapshot.params.id)
    .toPromise()
    .then(movie => this.movie = movie)
    .then(() => this.form.get('name').setValue(this.movie.name));



    this.form.valueChanges
    .subscribe(() => {
      if (this.httpError) this.httpError = undefined;
    })
  }
  Onsubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const movieToUpdate = new Movie();
    movieToUpdate.name = this.form.value.name.trim();
    movieToUpdate.imgUrl = this.form.value.imgUrl;
    this._movService.updateMovie(this.movie._id, movieToUpdate)
    .subscribe(
      (updatedMovie) => {
        this._router.navigate([''])
      },
      (err) => {
        const messageError = err.error.msg || 'حدث خطأ';
        this.httpError = messageError;
      }
    )
  }
}
