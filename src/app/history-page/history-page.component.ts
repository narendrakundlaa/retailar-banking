import { Component, OnInit } from '@angular/core';
import { BankDetailsService } from '../bank-details.service';
import { PaginationService } from '../pagination/pagination.service';
import { FundTransfer } from '../transfer-amount/fund-transfer';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  accountHistory: FundTransfer[];
  accountHistoryHeaders: any[];
  historyAccounts: string;
  constructor(private service: BankDetailsService, private pagerService: PaginationService) { }


  // array of all items to be paged
  allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  // pagedItems: any[];


  ngOnInit() {
    this.historyAccounts = 'Accounts summery';
    this.accountHistoryHeaders = ['name', 'account', 'bank', 'balance', 'date'];
    this.service.getAccountHistoryDetails().subscribe(val => {
      this.allItems = val;
      this.setPage(1);
    });

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.accountHistory = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
