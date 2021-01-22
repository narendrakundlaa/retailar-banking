import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDetailsComponent } from './account-details/account-details.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';

const routes: Routes = [
    { path: 'dashboard', component: DashBoardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'history', component: HistoryPageComponent },
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'trasfer-money', component: TransferAmountComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
