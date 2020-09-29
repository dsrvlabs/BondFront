import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dsrv-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('label') label: string;
  // tslint:disable-next-line: no-input-rename
  @Input('balance') balance: string;
  // tslint:disable-next-line: no-input-rename
  @Input('connect') connected: boolean;

  @Output() value = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyup(event: any): void {
    this.value.emit(event.target.value);
  }

}
