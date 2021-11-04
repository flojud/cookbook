import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Firestore, collection, collectionData, doc, docData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private db: Firestore) {}

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.db, 'categories');
    return collectionData(categoriesRef, {idField: 'id'}) as Observable<Category[]>;
  }

  getCategory(id: any): Observable<Category> {
    const categoryDocRef = doc(this.db, `categories/${id}`)
    return docData(categoryDocRef, {idField: 'id'}) as Observable<Category>;
  }

  addCategory(category: Category) {
    const categoryRef = collection(this.db, 'categories');
    return addDoc(categoryRef, category);
  }

  deleteCategory(id: any){
    const recipeDocRef = doc(this.db, `categories/${id}`)
    return deleteDoc(recipeDocRef);
  }

  updateCategory(category: Category) {
    const categoryRef = collection(this.db, 'categories');
    return addDoc(categoryRef, category);
  }
}
