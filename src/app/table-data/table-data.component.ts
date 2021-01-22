import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() tableName: string = "Sample Table";

  @Input() items: any[];  // array of object
  @Input() headers: any; // any [] // array for headder fields
  // tslint:disable-next-line:no-inferrable-types
  @Input() showUpdateBtn: boolean = false;
  @Input() showDeleteBtn: boolean = false;
  @Output() editEvent = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() showActionRow: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  updateData(data) {
    this.editEvent.emit(data);
  }
  deleteData(data_id) {
    this.delete.emit(data_id);
  }

}
