import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly apiUrl = 'http://localhost:8000/api';

  getApiUrl(): string {
    return this.apiUrl;
  }
}