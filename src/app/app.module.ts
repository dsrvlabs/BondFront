import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// import { WindowRef } from './WindowRef';
import { HeaderComponent } from './header/header.component';
import { NfyComponent } from './nfy/nfy.component';
import { YfnComponent } from './yfn/yfn.component';
import { NteComponent } from './nte/nte.component';
import { InputComponent } from './input/input.component';
import { BtnComponent } from './btn/btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputComponent,
    BtnComponent,
    NfyComponent,
    YfnComponent,
    NteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
