import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ImagesService } from '../services/images.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private categoryService: CategoryService,
    private imageService: ImagesService,
    private SpinnerService: NgxSpinnerService) {
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }
  
  ngOnInit(): void {}
  imgUrl: string;
  categories: Category[] = [];
  newRecipe: Recipe;

  recipeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10),]),
    ingredients: new FormControl('',[Validators.required, Validators.minLength(10),]),
    url: new FormControl(),
    image: new FormControl()
  }); 

  addImage(event: any) {
    this.SpinnerService.show(); 
    const file = event.target.files[0];
    this.imageService.upload("images", file.name, file).then(val => this.uploadDone(val));
  }

  uploadDone(url: string){
    this.imgUrl = url;
    this.SpinnerService.hide(); 
  }

  async addRecipe(): Promise<void>{
    this.SpinnerService.show();
    this.newRecipe = new Recipe(this.recipeFormGroup.value);
    
    if(this.imgUrl != null){  
      this.newRecipe.image = this.imgUrl;
    }

    console.log(this.newRecipe)

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
      this.SpinnerService.hide(); 
      this.router.navigate(['/home']);
    }
  }
}
