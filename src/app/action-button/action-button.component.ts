import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionButtonAnimations } from './action-button.animations';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
  animations: actionButtonAnimations
})
export class ActionButtonComponent implements OnInit {
  
  public isRecipePage: boolean = false;
  private recipeID: String;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private recipesService: RecipesService) {}

  ngOnInit(): void {}

  buttonClick() {
    this.isRecipePage = this.getRecipeIdFromUrl(window.location.pathname);
  }

  getRecipeIdFromUrl(url: string){
    if(url.includes('/recipe')){
      const urlArray = url.split('/');
      this.recipeID = urlArray[2];
      return true;
    }else{
      return false;
    }
  }

  edit(){
    this.router.navigate(['/recipe/'+this.recipeID+'/edit']);
  }

  delete(){
    if(confirm("Möchtest du das Rezepte " + this.recipeID + " wirklich löschen?")) {
      this.recipesService.deleteRecipe(this.recipeID);
    } 
  }
  bookmark(){}
  share(){}


}
