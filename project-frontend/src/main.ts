import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app/app.routes'; // ✅ Import file định tuyến

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    provideRouter(appRoutes), // ✅ Cung cấp định tuyến
  ]
}).catch(err => console.error(err));
