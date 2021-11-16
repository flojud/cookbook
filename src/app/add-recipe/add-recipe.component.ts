import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
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

  imgUrl: string;
  categories: Category[] = [];
  newRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private categoryService: CategoryService,
    private imageService: ImagesService,
    private SpinnerService: NgxSpinnerService) {
      this.getRecipeID();
      this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }
  
  ngOnInit(): void {
    this.loadRecipeData();
  }

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

  // capture edit case
  // and load data for edit recipe case
  recipeID: string;
  recipe: Recipe;

  getRecipeID(){
    this.activatedRoute.params.subscribe(params => {
      this.recipeID = params['id'];        
    });
  }

  loadRecipeData(){
    if( this.recipeID !== null ){
      this.recipesService.getRecipe(this.recipeID).subscribe(
        rec => {
          this.recipe = rec;
          this.updateFormFields();
      });
    }
  }

  updateFormFields(){
    this.recipeFormGroup.patchValue({
      name: this.recipe.name,
      category: this.recipe.category,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients,
      url: this.recipe.url,
      image: this.recipe.image
    });
  }
}
