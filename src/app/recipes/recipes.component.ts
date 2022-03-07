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
  count: number;
  
  constructor(
    private recipesService: RecipesService,
    private modalService: NgbModal,
    private logger: NGXLogger) {
    this.recipesService.getRecipes().subscribe( res => {
      this.recipes = res;
      this.count = this.recipes.length;
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
      
      this.count = this.recipes.length;
      this.logger.info("search() found " + this.recipes.length + " matching recipes");
    }else{
      this.recipes = this.recipesProtected;
    }
  }

  filter(val: any): void {
    if(val == "asc"){
      this.recipes.sort((a,b) => a.name.localeCompare(b.name));

    }else if(val == "desc"){
      this.recipes.sort((a,b) => b.name.localeCompare(a.name));

    }else if(val == "date-asc"){
      this.recipes.sort((a,b) => a.id > b.id ? 1 : -1);
    }
    else if(val == "date-desc"){
      this.recipes.sort((a,b) => b.id - a.id ? 1 : -1);
    }
  }
}
