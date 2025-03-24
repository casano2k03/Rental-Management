import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TestComponent } from './component/test/test.component';
import { AuthGuard } from '../app/gaurd/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent,  },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent },

  { path: '**', redirectTo: 'home' } // Mặc định chuyển hướng về home nếu nhập URL sai


];
