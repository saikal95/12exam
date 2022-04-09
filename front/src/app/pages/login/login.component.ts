import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {FacebookLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AppState} from "../../store/types";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {LoginError, LoginUserData, User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {loginUserRequest, loginUserSuccess} from "../../store/users.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
    private http: HttpClient,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      console.log('FB Login Successful!');
      console.log(user);
      this.http.post<User>(environment.apiUrl + '/user/facebookLogin', {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name
      }).subscribe(user => {
        this.store.dispatch(loginUserSuccess({user}));
      });
    });
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
