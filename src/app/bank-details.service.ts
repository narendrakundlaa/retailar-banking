import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AccountInformation } from './account-details/account';
import { catchError } from 'rxjs/operators';
import { FundTransfer } from './transfer-amount/fund-transfer';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {
  loginStautus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }
  // account-details

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  // get method
  getAccountDetails(): Observable<AccountInformation> {
    return this.httpClient.get<AccountInformation>(this.baseUrl + '/account-details');
  }

  getAccountHistoryDetails(): Observable<FundTransfer[]> {
    return this.httpClient.get<FundTransfer[]>(this.baseUrl + '/profile');
  }

  // getbyID
  getDetailsById(id: number): Observable<AccountInformation> {
    return this.httpClient.get<AccountInformation>(`${this.baseUrl + '/account-details'}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateLoginStatus(status: boolean) {
    this.loginStautus.next(status);
  }


  // updaate books
  updateUserBalance(user: AccountInformation): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl + '/account-details'}/${user.id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  userSend(user: FundTransfer): Observable<FundTransfer> {
    return this.httpClient.post<FundTransfer>(this.baseUrl + '/profile', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
