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
  // final firebase img url
  imgUrl: string; 
  // list of categories to show in dropdown
  categories: Category[] = [];
  // final new recipe 
  newRecipe: Recipe;
  // form to get values from for new recipe
  recipeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(10),]),
    ingredients: new FormControl('',[Validators.required, Validators.minLength(10),]),
    url: new FormControl(),
    image: new FormControl()
  }); 
  // WYSIWYG Editor
  html = '';
  editorIngredients: Editor;
  editorDescription: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  isEditorIngredients: boolean = false;
  isEditorDescription: boolean = false;
  //recipe to edit
  recipeID: string;
  recipe: Recipe;
  //crop Image
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageFile: any = '';
  file: any = '';
  
  ngOnInit(): void {
    this.loadRecipeData();
    this.editorIngredients = new Editor();
    this.editorDescription = new Editor();
  }

  ngOnDestroy(): void {
    this.editorIngredients.destroy();
    this.editorDescription.destroy();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }

  showEditorIngredients(){
    this.isEditorIngredients = true;
  }

  showEditorDescription(){
    this.isEditorDescription = true;
  }

  async addRecipe(): Promise<void>{
    this.SpinnerService.show();

    //upload croped image and wait for firestore upload completion
    await this.uploadImage().then(val =>  this.imgUrl = val );
    this.SpinnerService.hide();

    //read values from form to object
    this.newRecipe = new Recipe(this.recipeFormGroup.value);
  
    //get firebase final image url
    if(this.imgUrl != null){  
      this.newRecipe.image = this.imgUrl;
    }

    //write new recipe to firestore
    this.logger.info(this.newRecipe);
    await this.recipesService.addRecipe(this.newRecipe)
    this.SpinnerService.hide(); 
    this.router.navigate(['/home']);
    
  }

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
    return this.imageService.upload("images", this.file.name, this.croppedImageFile);
  }
}
