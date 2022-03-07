import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CurrentUserService } from '../services/currentUser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public displayName: string;

  constructor(
    private currentUserService: CurrentUserService,
    private logger: NGXLogger) {}

  ngOnInit(): void {    
    this.isLoggedIn = this.currentUserService.isLoggedIn();
  }

  async dologin(){
    this.logger.info('dologin()');
    await this.currentUserService.login();
    this.isLoggedIn = true;
    this.displayName = this.currentUserService.getUser().displayName;
  }

  async dologout(){
    await this.currentUserService.logout();
    this.isLoggedIn = false;
    this.logger.info('dologout()');
  }
}
