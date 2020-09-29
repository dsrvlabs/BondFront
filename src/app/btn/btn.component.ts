import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dsrv-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('label') label: string;

  @Output() clicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: any): void {
    this.clicked.emit(true);
  }

}
