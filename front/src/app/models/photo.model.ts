export class Photo  {
  constructor(
    public id: string,
    public title: string,
    public image: string,
    public author: string,
  ) {}
}

export interface PhotoData {
  [key: string]: any,
  title: string,
  image: string,
  author: string,
}

export interface ApiPhotoData {
  _id: string,
  title: string,
  image: string,
  author: string,
}

