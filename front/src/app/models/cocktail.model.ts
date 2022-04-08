export class Cocktail {
  constructor(
    public id: string,
    public user: string,
    public title: string,
    public image: string,
    public recipe: string,
    public published: boolean,
    public description: string,
    public ingredient: [ string ]
  ) {}
}

export interface CocktailData {
  [key: string]: any,
   user: string,
  title: string,
  image: File | null,
  recipe: string,
  published: boolean,
  description: string,
  ingredient: [string]
}

export interface ApiCocktailData {
  _id: string,
  user: string,
  title: string,
  image: string,
  recipe: string,
  published: boolean,
  description: string,
  ingredient: [ string ]
}

