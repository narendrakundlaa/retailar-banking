import { Component, OnInit } from '@angular/core';
import { BankDetailsService } from '../bank-details.service';
import { AccountInformation } from './account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: AccountInformation;
  userName: string;
  constructor(private accountDetails: BankDetailsService, private router: Router) { }

  ngOnInit() {
    this.accountDetails.getAccountDetails().subscribe(value => {
      this.account = value;
      this.userName = value[0].name;
    });
  }
  goToTransfer(User: string) {
    this.router.navigate(['/trasfer-money', User]);
    console.log(User);
  }

}
