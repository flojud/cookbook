import { Component, Injectable, Input, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() recipes : Recipe[] = [];
  recipesProtected : Recipe[] = [];
  selectedRecipe: Recipe;
  
  constructor(
    private recipesService: RecipesService,
    private modalService: NgbModal,
    private logger: NGXLogger) {
    this.recipesService.getRecipes().subscribe( res => {
      this.recipes = res;
      this.recipesProtected = res;
    })
  }

  ngOnInit(): void {}
  
  openRecipe(content: any, selectedRecipe: Recipe) {
    this.selectedRecipe = selectedRecipe
    this.modalService.open(content, {size: 'xl'});
  }

  search(searchEvent: any): void {
    if(searchEvent.target.value){
      const query = searchEvent.target.value.toLowerCase().trim();
      this.recipes = this.recipesProtected.filter( item => item.name.toLowerCase().includes(query.toLowerCase()) );
      this.logger.info("updateRecipesList() found " + this.recipes.length + " matching recipes");
    }else{
      this.recipes = this.recipesProtected;
    }
  }

  filter(val: any): void {

  }
}
