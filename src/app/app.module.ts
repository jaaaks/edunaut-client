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
import {FlexLayoutModule} from '@angular/flex-layout';
import { SeacrhServiceService } from './services/seacrh-service.service';
import { ProfileService } from './services/profile.service';

import {MatTooltipModule} from '@angular/material/tooltip';

import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatSliderModule} from '@angular/material/slider';
import { StarRatingModule } from 'angular-star-rating';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { CompaniesCarouselComponent } from './companies-carousel/companies-carousel.component';
import { TileComponent } from './tile/tile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import {MatTreeModule} from '@angular/material/tree'
import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

import { ContactusComponent } from './contactus/contactus.component';
import { PolicyComponent } from './policy/policy.component';
import { FAQComponent } from './faq/faq.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { OngoingCoursesComponent } from './ongoing-courses/ongoing-courses.component';
import { CompletedCoursesComponent } from './completed-courses/completed-courses.component';
import { BookmarkedCoursesComponent } from './bookmarked-courses/bookmarked-courses.component';
import { RightCourseComponent } from './right-course/right-course.component';
import { ComicComponent } from './comic/comic.component';
import { TeamComponent } from './team/team.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { Ng5SliderModule } from 'ng5-slider';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { RelevantCoursesComponent } from './relevant-courses/relevant-courses.component';
import {MatMenuModule} from '@angular/material/menu';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import {MatChipsModule} from '@angular/material/chips';
import {UserServiceService} from './services/user-service.service';
import { BadgesComponent } from './badges/badges.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';



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
    AboutusComponent,
    ListingPageComponent,
    ContactusComponent,
    PolicyComponent,
    FAQComponent,
    ScrollSpyDirective,
    ComingSoonComponent,
    ProfileComponent,
    OngoingCoursesComponent,
    CompletedCoursesComponent,
    BookmarkedCoursesComponent,
    RightCourseComponent,
    ComicComponent,
    TeamComponent,
    CourseDetailComponent,
    RelevantCoursesComponent,
    EmailVerificationComponent,
    BadgesComponent,
    BottomSheetComponent
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
    SpringSpinnerModule,
    NgbModule,
    MatButtonModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
   FlexLayoutModule,
   MatDividerModule,
   HttpClientModule,
   FontAwesomeModule,
   FormsModule,
 CommonModule,
 MatCheckboxModule,
 MatSliderModule,
 MatFormFieldModule,
 MatExpansionModule,
 StarRatingModule.forRoot(),
 MatDialogModule,
 MatSnackBarModule,
 Ng5SliderModule,
 MatMenuModule,
 MatChipsModule,
 InfiniteScrollModule,
 NgxSpinnerModule,
 MatBottomSheetModule,
 MatTooltipModule,
 MatStepperModule
],
  providers: [AuthenticationService,SeacrhServiceService, ProfileService,UserServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
