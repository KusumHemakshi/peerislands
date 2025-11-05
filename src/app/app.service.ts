import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IRegistration } from '../assets/model/registration.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(private http:HttpClient) { }
  
  getRegistrationData(): Observable<IRegistration> {
    const url = 'assets/mock-data/registration-data.json';
    return this.http.get<IRegistration>(url);
  }
}
