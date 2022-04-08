import { Cocktail } from '../models/cocktail.model';
import { LoginError, RegisterError, User } from '../models/user.model';


export type CocktailsState = {
  products: Cocktail[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  cocktails: CocktailsState ,
  users: UsersState,
}
