import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  spinnerVisible: Boolean = false;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private categoryService: CategoryService,
    private imageService: ImagesService) {
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
  
  fileUpload(event: any) {
    this.spinnerVisible = true;
    const url = this.imageService.uploadImage(event.target.files[0]).then(function(url){
      return url;
    })

    console.log('url is: ' + url);
    console.log('url is: ' + this.imageService.downloadUrl$);
    this.spinnerVisible = false;
  }

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
