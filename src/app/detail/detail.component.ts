import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../models/recipe';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string;
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private rating: NgbRatingConfig) {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
      });
      // customize default values of ratings used by this component tree
      rating.max = 5;
      rating.readonly = false;
   }

  ngOnInit(): void {
    this.recipesService.getRecipe(this.id).subscribe(rec => this.recipe = rec );
  }

}
