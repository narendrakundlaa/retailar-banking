import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RegisterComponent } from './register/register.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ProfileComponent } from './profile/profile.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';

import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AlertComponentComponent } from './alert-component/alert-component.component';
import { TableDataComponent } from './table-data/table-data.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    RegisterComponent,
    AccountDetailsComponent,
    HistoryPageComponent,
    ProfileComponent,
    TransferAmountComponent,
    LoginComponent,
    AlertComponentComponent,
    PageNotFoundComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
