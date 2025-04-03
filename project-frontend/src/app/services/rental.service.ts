import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8000/api/rentals';

  constructor(private http: HttpClient) {}

  rentNow(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/rent_now/`, {});
  }
}
