import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieSService } from '../MovieServices/movie-s.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css'],
})
export class UpdateMovieComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', []),
  });

  constructor(
    private _MovService: MovieSService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._MovService.getMovieById(this._route.snapshot.params.id);
  }
  ngOnInit(): void {}
  Onsubmit() {
    console.log('Form To save changes Was saved');
  }
}
