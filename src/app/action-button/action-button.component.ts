import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionButtonAnimations } from './action-button.animations';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';
import { CurrentUserService } from '../services/currentUser.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
  animations: actionButtonAnimations
})
export class ActionButtonComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(
    public dialog: MatDialog,
    private currentUserService: CurrentUserService,
    private logger: NGXLogger) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.currentUserService.isLoggedIn();  
  }
  

  buttonClick() {}
  bookmark(){}
  share(){}
}
