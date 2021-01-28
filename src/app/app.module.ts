import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LazyImgDirective } from './lazy-img.directive';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LazyImgDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
