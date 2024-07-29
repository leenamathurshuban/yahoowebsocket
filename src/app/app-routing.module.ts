import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WsdemoComponent } from './wsdemo/wsdemo.component';

const routes: Routes = [
  { path: "", component: WsdemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
