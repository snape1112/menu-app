import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Screen } from './screen';

export const API_URL = 'http://localhost:8000/api';
export const SERVER_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getScreens(): Observable<Object> {
    return this.http.get<Object>(`${API_URL}/menu/`);
  }
}
