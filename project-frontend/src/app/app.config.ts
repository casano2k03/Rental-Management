import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Sử dụng appRoutes thay vì routes
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    ConfigService
  ],
};