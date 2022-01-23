import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ibook',
    loadChildren: () => import('./feature/ibook/ibook.module').then((m) => m.IbookModule)
  },
  {
    path: 'send',
    loadChildren: () => import('./feature/send/send.module').then((m) => m.SendModule)
  },
  {
    path: '', 
    redirectTo: 'ibook', 
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'ibook'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
