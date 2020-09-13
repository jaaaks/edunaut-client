import { Injectable } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import {Observable} from 'rxjs';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<any> {
  constructor(private service: UserServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.sampleCourse();
  }
}