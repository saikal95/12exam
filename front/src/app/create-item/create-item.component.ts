import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/types";
import {PhotoData} from "../models/photo.model";
import {createPhotoRequest} from "../store/photo.actions";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.sass']
})
export class CreateItemComponent  {
  @ViewChild('f') form!: NgForm;
  error: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.photos.createError);
  }

  onSubmitPhotos(){
    const photoData: PhotoData = this.form.value;
    this.store.dispatch(createPhotoRequest ({photoData}));
  }
}
