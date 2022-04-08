import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {environment} from "../environments/environment";
import { LoginComponent } from './pages/login/login.component';
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {LayoutComponent} from "./ui/layout/layout.component";
import {Routes} from "@angular/router";
import {RegisterComponent} from "./pages/register/register.component";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {ValidateIdenticalDirective} from "./pages/register/validate-identical.directive";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CenterCardComponent} from "./ui/center-card/center-card.component";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {localStorageSync} from "ngrx-store-localstorage";
import {usersReducer} from "./store/users.reducer";
import {UsersEffects} from "./store/users.effects";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth.interceptor";
import {HasRolesDirective} from "./directives/has-roles.directive";
import {UserTypeDirective} from "./directives/user-type.directive";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FileInputComponent} from "./ui/file-input/file-input.component";
import { OneCocktailComponent } from './one-cocktail/one-cocktail.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { AddCocktailComponent } from './add-cocktail/add-cocktail.component';
const  socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email, public_profile'
      })
    }
  ]
}

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
};

const effects = [ UsersEffects];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    ValidateIdenticalDirective,
    CenterCardComponent,
    HasRolesDirective,
    UserTypeDirective,
    FileInputComponent,
    OneCocktailComponent,
    CocktailsComponent,
    AddCocktailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    SocialLoginModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    FlexModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: 'SocialAuthServiceConfig', useValue : socialConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
