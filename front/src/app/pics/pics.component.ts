import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Photo} from "../models/photo.model";
import {Store} from "@ngrx/store";
import {AppState} from "../store/types";
import {ActivatedRoute} from "@angular/router";
import {fetchPhotosRequest} from "../store/photo.actions";

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.sass']
})
export class PicsComponent implements OnInit {
  photos: Observable<Photo[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>, ) {
    this.photos = store.select(state => state.photos.photos);
    this.loading = store.select(state => state.photos.fetchLoading);
    this.error = store.select(state => state.photos.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPhotosRequest());
  }

}
