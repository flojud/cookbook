import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Firestore, collection, collectionData, doc, docData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from '@firebase/firestore';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  
  constructor(private db: Firestore, private logger: NGXLogger) {}

  getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.db, 'recipes');
    return collectionData(recipesRef, {idField: 'id'}) as Observable<Recipe[]>;
  }

  getRecipe(id: any): Observable<Recipe> {
    this.logger.info('get Recipe with id: ' + id);
    const recipeDocRef = doc(this.db, `recipes/${id}`)
    return docData(recipeDocRef, {idField: 'id'}) as Observable<Recipe>;
  }

  addRecipe(recipe: Recipe) {
    this.logger.info('add Recipe: ' + recipe);
    const recipeRef = collection(this.db, 'recipes');
    return addDoc(recipeRef, {
      name: recipe.name,
      category: recipe.category,
      description : recipe.description,
      ingredients: recipe.ingredients,
      url: recipe.url,
      image: recipe.image
    });
  }

  deleteRecipe(id: any){
    this.logger.info('delete Recipe with id: ' + id);
    const recipeDocRef = doc(this.db, `recipes/${id}`)
    return deleteDoc(recipeDocRef);
  }

  updateRecipe(recipe: Recipe) {
    this.logger.info('update Recipe: ' + recipe);
    const recipeRef = collection(this.db, 'recipes');
    return addDoc(recipeRef, recipe);
  }
}
