import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { constant } from '../../Common/constants';
import { Token } from '../../Common/model';

export const URL = new InjectionToken('URL'); // custom Injection token for URL

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(@Inject(URL) private url: string, private http: HttpClient) {}

  public login(credentials) {
    return this.http.post<Token>(
      environment.base_url + constant.API_URL.TOKEN,
      credentials,
      {
        headers: new HttpHeaders().set(
          constant.CONTENT_TYPE,
          constant.CONTENT_TYPE_JSON
        ),
      }
    );
  }

  public sendMessage(data) {
    const token = localStorage.getItem(constant.ACCESS_TOKEN);
    return this.http.post<Token>(
      environment.base_url + constant.API_URL.NOTIFICATIONS,
      data,
      {
        headers: this.headers(),
      }
    );
  }

  private headers() {
    const token = localStorage.getItem(constant.ACCESS_TOKEN);
    let headers = new HttpHeaders()
      .set(constant.ACCEPT, constant.CONTENT_TYPE_JSON)
      .set(constant.AUTHORIZATION, constant.BEARER + token);

    return headers;
  }
}
