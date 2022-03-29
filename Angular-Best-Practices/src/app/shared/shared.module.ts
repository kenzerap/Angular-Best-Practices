import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerDirective } from "./directives/spinner.directive";
import { AuthGuard } from "./guards/auth-guard.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { UnauthResponseInterceptor } from "./interceptors/unauth-response.interceptor";
import { PermissionGuard } from "./guards/permission-guard.service";
import { NumberWithCommasPipe } from "./pipes/number-with-commas.pipe";

const MATERIAL_MODULES: any[] = [
  MatTableModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSnackBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MATERIAL_MODULES,
    ReactiveFormsModule
  ],
  declarations: [NavBarComponent, SpinnerDirective, NumberWithCommasPipe],
  exports: [
    NavBarComponent,
    HttpClientModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    SpinnerDirective,
    NumberWithCommasPipe
  ],
  providers: [
    AuthGuard,
    PermissionGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthResponseInterceptor, multi: true },
  ]
})
export class SharedModule { }