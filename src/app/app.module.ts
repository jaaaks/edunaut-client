import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import {SpringSpinnerModule} from 'angular-epic-spinners'
/* Auth service */
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgwWowModule } from 'ngx-wow';
import { CompaniesCarouselComponent } from './companies-carousel/companies-carousel.component';
import { TileComponent } from './tile/tile.component';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HomepageComponent,
    CompaniesCarouselComponent,
    TileComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    NguCarouselModule,
    MDBBootstrapModule.forRoot(),
BrowserAnimationsModule,
AppRoutingModule,
ReactiveFormsModule ,
AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgwWowModule,
    SpringSpinnerModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
