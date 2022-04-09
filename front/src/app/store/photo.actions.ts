import {createAction, props} from "@ngrx/store";
import {ApiPhotoData, Photo, PhotoData} from "../models/photo.model";


export const fetchPhotosRequest = createAction('[Photo] Fetch Request'
);

export const fetchPhotoSuccess = createAction(
  '[Photo] Fetch Success',
  props<{photos: Photo[]}>()
);
export const fetchPhotoFailure = createAction(
  '[Photo] Fetch Failure',
  props<{error: string}>()
);

export const createPhotoRequest = createAction(
  '[Photo] Create Photo',
  props<{photoData: PhotoData}>()
);
export const createPhotoSuccess = createAction(
  '[Photo] Create Success'
);
export const createPhotoFailure = createAction(
  '[Photo] Create Failure',
  props<{error: string}>()
);

