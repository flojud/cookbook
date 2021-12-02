import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from '../models/recipe';
import { CurrentUserService } from '../services/currentUser.service';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public id: string;
  public recipe: Recipe;

  public isRecipePage: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private router: Router,
    private recipesService: RecipesService,
    private rating: NgbRatingConfig,
    private SpinnerService: NgxSpinnerService,
    private logger: NGXLogger) {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];        
      });
      // customize default values of ratings used by this component tree
      rating.max = 5;
      rating.readonly = false;
   }

  ngOnInit(): void {
    this.recipesService.getRecipe(this.id).subscribe(rec => this.recipe = rec );
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isLoggedIn = this.currentUserService.isLoggedIn();
  }

  // maybe needed later on another page
  //this.isRecipePage = this.getRecipeIdFromUrl(window.location.pathname);
  getRecipeIdFromUrl(url: string){
    this.logger.info('get RecipeId from Url ' + url);
    if(url.includes('/recipe')){
      const urlArray = url.split('/');
      this.id = urlArray[2];
      return true;
    }else{
      return false;
    }
  }

  edit(){
    this.logger.info('edit clicked');
    this.router.navigate(['/recipe/'+this.id+'/edit']);
  }

  async delete(){
    this.logger.info('delete clicked');
    if(confirm("Möchtest du das Rezepte " + this.id + " wirklich löschen?")) {
      this.logger.info('confirmed deletion of ' + this.id );
      this.SpinnerService.show();
      await this.recipesService.deleteRecipe(this.id);
      this.SpinnerService.hide(); 
      this.router.navigate(['/home']);
    } 
  }

  print() {
    window.print();
}
  
}
