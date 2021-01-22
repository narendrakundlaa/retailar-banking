import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BankDetailsService } from '../bank-details.service';
import { AccountInformation } from '../account-details/account';
import { FundTransfer } from './fund-transfer';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.css']
})
export class TransferAmountComponent implements OnInit {
  transferMoney: FormGroup;
  accountInformation: AccountInformation;
  submitted = false;
  fundTransfer: FundTransfer;
  availableBalance: number;
  alertBalanceMessage = false;

  alertType: string;
  // tslint:disable-next-line:no-inferrable-types
  displayAlert: boolean = false;
  alertMessage: string;
  constructor(private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private http: HttpClient, private bankDetailsService: BankDetailsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.transferMoney = this.formBuilder.group({
      name: ['', [Validators.required]],
      account: ['', [Validators.required]],
      confirmAccount: ['', [Validators.required]],
      bank: ['', [Validators.required, Validators.minLength(10)]],
      balance: ['', [Validators.required]],
      date: [new Date()]
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getAccount(id);
      }
    });

    this.transferMoney.controls.balance.valueChanges.subscribe((val: number) => {
      // console.log(val);
      const bal: number = this.accountInformation.balance;
      if (val > bal) {
        this.alertBalanceMessage = true;
      } else {
        this.alertBalanceMessage = false;
      }
    });

  }


  getAccount(id: number) {
    this.bankDetailsService.getDetailsById(id)
      .subscribe(
        (user: AccountInformation) => {
          this.accountInformation = user;
        },
        (err: any) => console.log(err)
      );
  }

  get f() { return this.transferMoney.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.transferMoney.invalid) {
      return;
    }
    // this.sendMoney();
  }

  sendMoney() {
    if (confirm('Are you sure you want to proceed?')) {
      this.onSubmit();
      this.transferMoney.patchValue({
        date: new Date().toDateString()
      });
      this.bankDetailsService.userSend(this.transferMoney.value).subscribe(borrowedBooks => {
        if (borrowedBooks) {
          this.alertType = 'success';
          this.displayAlert = true;
          this.alertMessage = `Thanks   `;
        }
      });
      this.updateMethod();
    } else {
      return;
    }


  }
  updateMethod() {
    const senderAmount: number = this.transferMoney.controls.balance.value;
    this.availableBalance = this.accountInformation.balance - senderAmount;
    this.accountInformation.balance = this.availableBalance;
    this.bankDetailsService.updateUserBalance(this.accountInformation).subscribe(val => {
      this.alertType = 'success';
      this.displayAlert = true;
      this.alertMessage = `Thanks..! `;
      // tslint:disable-next-line:no-unused-expression
      (err: any) => console.log(err);
    });
  }

  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['account-details']);
  }

}
