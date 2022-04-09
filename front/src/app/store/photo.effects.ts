import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  createPhotoFailure,
  createPhotoRequest,
  createPhotoSuccess,
  fetchPhotoFailure,
  fetchPhotosRequest,
  fetchPhotoSuccess
} from "./photo.actions";
import {catchError, mergeMap, of, tap} from "rxjs";
import {PhotoService} from "../services/photo.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";


@Injectable()
export class PhotoEffects {

  fetchPhotos = createEffect(() => this.actions.pipe(
    ofType(fetchPhotosRequest),
    mergeMap(()=> this.photoService.getPhotos().pipe(
      map(photos => fetchPhotoSuccess({photos})),
      catchError(()=> of(fetchPhotoFailure ({
        error: 'Something went wrong',
      })))
    ))

  ));


  createPhoto = createEffect(() => this.actions.pipe(
    ofType(createPhotoRequest),
    mergeMap(({photoData}) => this.photoService.createPhoto(photoData).pipe(
      map(() => createPhotoSuccess ()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPhotoFailure ({error: 'No photo'})))
    ))
  ));



  constructor(
    private actions: Actions,
    private photoService: PhotoService,
    private router: Router
  ) {}
}
