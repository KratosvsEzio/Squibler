import { NgModule } from '@angular/core';

import { IbookRoutingModule, routingComponent } from './ibook-routing.module';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    routingComponent,
  ],
  imports: [
    IbookRoutingModule,
    QuillModule.forRoot(),
    SharedModule
  ]
})
export class IbookModule { }
