import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  constructor(private recipesService: RecipesService) { }
  
  categories: string[];
  newRecipe: Recipe;

  recipeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10),]),
    ingredients: new FormControl('',[Validators.required, Validators.minLength(10),]),
    url: new FormControl(),
    image: new FormControl()
  }); 

  ngOnInit(): void {
    this.categories = this.recipesService.getCategories();
  }
  
  addRecipe(): void{
    this.newRecipe = new Recipe(this.recipeFormGroup.value);
    this.recipesService.addRecipe(this.newRecipe); 
    console.log(this.recipesService.getRecipes());
  }

}
