import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ImagesService } from '../services/images.service';
import { NgxSpinnerService } from "ngx-spinner";  
import { Editor, Toolbar } from 'ngx-editor';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  imgUrl: string;
  categories: Category[] = [];
  newRecipe: Recipe;

  // WYSIWYG Editor
  html = '';
  editorIngredients: Editor;
  editorDescription: Editor;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private categoryService: CategoryService,
    private imageService: ImagesService,
    private SpinnerService: NgxSpinnerService,
    private logger: NGXLogger) {
      this.getRecipeID();
      this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }
  
  ngOnInit(): void {
    this.logger.info('add recipe onInit');
    this.loadRecipeData();
    this.editorIngredients = new Editor();
    this.editorDescription = new Editor();
  }

  ngOnDestroy(): void {
    this.editorIngredients.destroy();
    this.editorDescription.destroy();
  }

  recipeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10),]),
    ingredients: new FormControl('',[Validators.required, Validators.minLength(10),]),
    url: new FormControl(),
    image: new FormControl()
  }); 

  async addRecipe(): Promise<void>{
    this.SpinnerService.show();
    this.newRecipe = new Recipe(this.recipeFormGroup.value);
    
    if(this.imgUrl != null){  
      this.newRecipe.image = this.imgUrl;
    }

    this.logger.info(this.newRecipe);

    const success = this.recipesService.addRecipe(this.newRecipe)
    .then(function(docRef) {
      //console.log("Document written with ID: ", docRef.id);
      return true;
    })
    .catch(function(error) {
      //console.error("Error adding document: ", error);
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
    if( this.recipeID !== null && this.recipeID !== undefined){
      if(! this.recipeID.includes('add')){
        this.recipesService.getRecipe(this.recipeID).subscribe(
          rec => {
            this.recipe = rec;
            this.updateFormFields();
        });
      }
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


  addImage(event: any) {
    this.SpinnerService.show(); 
    const file = event.target.files[0];
    this.imageService.upload("images", file.name, file).then(val => this.uploadDone(val));
  }

  uploadDone(url: string){
    this.logger.info('download url: ' + url);
    this.imgUrl = url;
    this.logger.info('upload completed dismiss loading spinner');
    this.SpinnerService.hide(); 
  }

  //Crop Image
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageFile: any = '';
  file: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.file = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
      this.logger.info('image cropped');
      this.croppedImage = event.base64;
      this.croppedImageFile = base64ToFile(this.croppedImage);
  }
  imageLoaded() {
    this.logger.info('image loaded');
  }
  cropperReady() {
    this.logger.info('cropper is ready');
  }
  loadImageFailed() {
      this.logger.error('loadImageFailed');
  }
  uploadImage() {
    this.logger.debug('uploadImage > filename: ' + this.file.name);
    this.imageService.upload("images", this.file.name, this.croppedImageFile).then(val => this.uploadDone(val));
  }
}
