import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IbookComponent } from './ibook.component';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { WordLookupComponent } from './word-lookup/word-lookup.component';
import { DialogAddSectionComponent } from './dialog-add-section/dialog-add-section.component';

const routes: Routes = [
  { path: '', component: IbookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IbookRoutingModule { }
export const routingComponent = [IbookComponent, AsideComponent, MainComponent, WordLookupComponent, DialogAddSectionComponent]
