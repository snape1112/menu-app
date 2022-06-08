import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
// import { Screen } from './screen';

export const API_URL = environment.apiUrl;
export const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getScreens(): Observable<Object> {
    return this.http.get<Object>(`${API_URL}/menu/`);
  }
}
