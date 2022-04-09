import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ApiPhotoData, Photo, PhotoData} from "../models/photo.model";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  getPhotos() {
    return this.http.get<ApiPhotoData[]>(environment.apiUrl + '/photo').pipe(
      map(response => {
        return response.map(cocktailData => {
          console.log(cocktailData)
          return new Photo(
            cocktailData._id,
            cocktailData.title,
            cocktailData.image,
            cocktailData.author,
          );
        });
      })
    );
  }


  createPhoto(photoData: PhotoData) {
    const formData = new FormData();

    Object.keys(photoData).forEach(key => {
      if (photoData[key] !== null) {
        formData.append(key, photoData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/photo', formData);
  }


}
