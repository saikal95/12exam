import {PhotoState} from "./types";
import {createReducer, on} from "@ngrx/store";
import {
  createPhotoFailure,
  createPhotoRequest,
  createPhotoSuccess,
  fetchPhotoFailure,
  fetchPhotosRequest,
  fetchPhotoSuccess
} from "./photo.actions";


const  initialState : PhotoState = {
  photos : [],
  fetchLoading: false,
  fetchError: <null | string>null,
  createLoading: false,
  createError: null,
}

export const photoReducer = createReducer(
  initialState,

  on(fetchPhotosRequest, state => ({...state, fetchLoading: true})),
  on(fetchPhotoSuccess, (state, {photos}) => ({
    ...state,
    fetchLoading: false,
    photos
  })),
  on(fetchPhotoFailure , (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error,
  })),
  on(createPhotoRequest, state => ({...state, createLoading: true})),
  on(createPhotoSuccess, state => ({...state, createLoading: false})),
  on(createPhotoFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),







);
