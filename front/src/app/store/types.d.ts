import { Photo} from '../models/photo.model';
import { LoginError, RegisterError, User } from '../models/user.model';


export type PhotoState = {
  photos: Photo[],
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
  photos: PhotoState,
  users: UsersState,
}
