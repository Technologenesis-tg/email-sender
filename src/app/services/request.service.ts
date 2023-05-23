import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  // public global_url:any = "http://uat.technologenesis.com/public/api/";

  private baseUrl = 'https://uat.technologenesis.com/public/api';

  constructor(private http: HttpClient) { }

  private getToken(): string {
    const token = localStorage.getItem('bearer_token');
    return token !== null && token !== undefined ? token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdWF0LnRlY2hub2xvZ2VuZXNpcy5jb20vcHVibGljL2FwaS9sb2dpbiIsImlhdCI6MTY4NDQwODEzNCwiZXhwIjo0ODM4MDA4MTM0LCJuYmYiOjE2ODQ0MDgxMzQsImp0aSI6ImVlYWxmM1Nzc3JXeEhGOWMiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.sWQRsN_uaDCIn5pExM55pa-i9CHX_oZ7xiFmG4_14C8';
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
    return headers;
  }

  public get(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }

  public post(endpoint: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  public put(endpoint: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  public delete(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers });
  }
}
