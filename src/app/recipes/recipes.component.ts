import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes : Recipe[] = [];
  selectedRecipe: Recipe;
  
  constructor(
    private recipesService: RecipesService,
    private modalService: NgbModal,
    private logger: NGXLogger) {
    this.recipesService.getRecipes().subscribe( res => {
      this.logger.info(res);
      this.recipes = res;
    })
  }

  ngOnInit(): void {}
  
  openRecipe(content: any, selectedRecipe: Recipe) {
    this.selectedRecipe = selectedRecipe
    this.modalService.open(content, {size: 'xl'});
  }
}
