import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes : Recipe[] = [];
  selectedRecipe: Recipe;
  
  constructor(
    private recipesService: RecipesService,
    private modalService: NgbModal) {
    this.recipesService.getRecipes().subscribe( res => {
      this.recipes = res;
    })
  }

  ngOnInit(): void {}

  deleteRecipe(recipe: Recipe): void {
    if(confirm("Möchtest du das Rezepte " + recipe.name + " wirklich löschen?")) {
      this.recipesService.deleteRecipe(recipe.id);
    } 
  }
  
  openRecipe(content: any, selectedRecipe: Recipe) {
    this.selectedRecipe = selectedRecipe
    this.modalService.open(content, {size: 'xl'});
  }
}
