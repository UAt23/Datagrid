import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DatagridComponent } from './components/datagrid/datagrid.component';

import { DxDataGridModule } from 'devextreme-angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { TableFunctionsComponent } from './components/table-functions/table-functions.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';

const COMPONENTS = [NavbarComponent, DatagridComponent];
const SERVICES = [];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    TableFunctionsComponent,
    TablePaginationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    DxDataGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
