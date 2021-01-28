import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component:LandingPageComponent  },
  { path: 'launch', component:LandingPageComponent  },
  { path: 'launch&land', component:LandingPageComponent  },
  { path: 'all', component:LandingPageComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }