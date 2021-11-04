import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
//import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, collection, collectionData, doc, docData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  
  constructor(private db: Firestore) {}

  getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.db, 'recipes');
    return collectionData(recipesRef, {idField: 'id'}) as Observable<Recipe[]>;
  }

  getRecipe(id: any): Observable<Recipe> {
    const recipeDocRef = doc(this.db, `recipes/${id}`)
    return docData(recipeDocRef, {idField: 'id'}) as Observable<Recipe>;
  }

  addRecipe(recipe: Recipe) {
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
    const recipeDocRef = doc(this.db, `recipes/${id}`)
    return deleteDoc(recipeDocRef);
  }

  updateRecipe(recipe: Recipe) {
    const recipeRef = collection(this.db, 'recipes');
    return addDoc(recipeRef, recipe);
  }
}
