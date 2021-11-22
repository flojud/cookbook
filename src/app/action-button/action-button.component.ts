import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionButtonAnimations } from './action-button.animations';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
  animations: actionButtonAnimations
})
export class ActionButtonComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private recipesService: RecipesService,
    private SpinnerService: NgxSpinnerService,
    private logger: NGXLogger) {}
  
  public isRecipePage: boolean = false;
  private recipeID: String;

  ngOnInit(): void {}

  buttonClick() {
    this.isRecipePage = this.getRecipeIdFromUrl(window.location.pathname);
  }

  getRecipeIdFromUrl(url: string){
    this.logger.info('get RecipeId from Url ' + url);
    if(url.includes('/recipe')){
      const urlArray = url.split('/');
      this.recipeID = urlArray[2];
      return true;
    }else{
      return false;
    }
  }

  edit(){
    this.logger.info('edit clicked');
    this.router.navigate(['/recipe/'+this.recipeID+'/edit']);
  }

  async delete(){
    this.logger.info('delete clicked');
    if(confirm("Möchtest du das Rezepte " + this.recipeID + " wirklich löschen?")) {
      this.logger.info('confirmed deletion of ' + this.recipeID );
      this.SpinnerService.show();
      await this.recipesService.deleteRecipe(this.recipeID);
      this.SpinnerService.hide(); 
      this.router.navigate(['/home']);
    } 
  }
  bookmark(){}
  share(){}


}
