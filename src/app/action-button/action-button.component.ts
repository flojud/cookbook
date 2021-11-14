import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionButtonAnimations } from './action-button.animations';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
  animations: actionButtonAnimations
})
export class ActionButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  doAction(val: string) {
    console.log(val);
  }
}
