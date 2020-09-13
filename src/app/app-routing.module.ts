import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PolicyComponent } from './policy/policy.component';
import {FAQComponent} from './faq/faq.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ProfileComponent} from './profile/profile.component';
import {RightCourseComponent} from './right-course/right-course.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {HeroResolver} from './resolvers/apiResolver';
import {BadgesComponent} from './badges/badges.component';

const routes: Routes = [
  {path: 'badges', component: BadgesComponent},
  {path:'course-detail', component:CourseDetailComponent},
  {path:'right-course', component:RightCourseComponent},
  {path:'profile', component:ProfileComponent, resolve: {heroResolver: HeroResolver }},
  {path:'coming-soon', component:ComingSoonComponent },
  {path:'faq', component:FAQComponent},
  {path: 'policy', component: PolicyComponent},
  { path: 'contactus', component: ContactusComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent },
  {path:'find',component:ListingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }