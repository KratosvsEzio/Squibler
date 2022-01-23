import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconSnackBarComponent } from 'src/app/utility/components/icon-snack-bar/icon-snack-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { ApiRequestInterceptor } from './interceptors/api-request-interceptor';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    IconSnackBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiRequestInterceptor,
          multi: true
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
          useValue: {duration: 3000}
        }
      ]
    }
  }
}
