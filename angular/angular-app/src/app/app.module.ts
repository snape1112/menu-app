import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ScreenPageComponent } from './screen-page/screen-page.component';
import { ScreenListComponent } from './screen-list/screen-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ScreenPageComponent,
    ScreenListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ScreenListComponent},
      {path: 'cast/:id', component: ScreenPageComponent},
    ]),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
