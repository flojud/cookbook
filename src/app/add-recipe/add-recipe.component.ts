import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  
  categories: Category[] = [];

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }
  
  
  newRecipe: Recipe;

  recipeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10),]),
    ingredients: new FormControl('',[Validators.required, Validators.minLength(10),]),
    url: new FormControl(),
    image: new FormControl()
  }); 

  ngOnInit(): void {}
  
  async addRecipe(): Promise<void>{
    this.newRecipe = new Recipe(this.recipeFormGroup.value);

    const success = this.recipesService.addRecipe(this.newRecipe)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return true;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return false;
    });

    if(await success){
      this.router.navigate(['/home']);
    }
  }
}
