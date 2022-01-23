import { NgModule } from '@angular/core';

import { SendRoutingModule, routingComponent } from './send-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    routingComponent
  ],
  imports: [
    SendRoutingModule,
    SharedModule
  ]
})
export class SendModule { }
