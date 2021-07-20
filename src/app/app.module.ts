import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';

import { FormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AutocompleteLibModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
