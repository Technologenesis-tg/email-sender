import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './componets/emails/emails.component';
import { CompanyComponent } from './componets/company/company.component';

const routes: Routes = [
  { path: 'emails', component: EmailsComponent },
  { path: 'company', component: CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
