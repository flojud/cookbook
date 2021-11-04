import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes : Recipe[] = [];
  
  constructor(private recipesService: RecipesService) {
    this.recipesService.getRecipes().subscribe( res => {
      this.recipes = res;
    })
  }

  ngOnInit(): void {}

  deleteRecipe(recipe: Recipe): void {
    this.recipesService.deleteRecipe(recipe.id);
  }
}
