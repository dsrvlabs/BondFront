import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NfyComponent } from './nfy/nfy.component';
import { YfnComponent } from './yfn/yfn.component';
import { NteComponent } from './nte/nte.component';

const routes: Routes = [
  {
    path: 'nfy',
    component: NfyComponent
  },
  {
    path: 'yfn',
    component: YfnComponent
  },
  {
    path: 'nte',
    component: NteComponent,
    children: [
      {
        path: ':address/:amount', // child route path
        component: NteComponent, // child route component that the router renders
      }
    ]
  },
  { path: '', redirectTo: '/nfy', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
