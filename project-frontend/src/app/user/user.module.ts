import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    UserComponent, // Khai báo UserComponent
    HomeComponent,  // Khai báo HomeComponent
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],

  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }