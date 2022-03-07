import { Injectable } from '@angular/core';
import { Rate } from '../models/rate';
import { Firestore, collection, collectionData, doc, docData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  
  constructor(private db: Firestore) {}

  getRateByRecip(recipeid: number): number{
      let recipeRates: Rate[] = [];
      this.getRates().subscribe( rates => {
        recipeRates = rates.filter( item => item.recipeid ==  recipeid );
      })

      let count = 0;
      let value = 0;

      recipeRates.forEach(rate => {
          value = value + rate.value;
          count++;
      })
      
      return value/count;
  }

  getRates(): Observable<Rate[]> {
    const ratesRef = collection(this.db, 'rates');
    return collectionData(ratesRef, {idField: 'id'}) as Observable<Rate[]>;
  }

  getRate(id: any): Observable<Rate> {
    const rateDocRef = doc(this.db, `rates/${id}`)
    return docData(rateDocRef, {idField: 'id'}) as Observable<Rate>;
  }

  addRate(rate: Rate) {
    const rateRef = collection(this.db, 'categories');
    return addDoc(rateRef, {
        recipeid: rate.recipeid,
        value: rate.value
    });
  }

  deleteRate(id: any){
    const recipeDocRef = doc(this.db, `categories/${id}`)
    return deleteDoc(recipeDocRef);
  }

  updateRate(category: Rate) {
    const categoryRef = collection(this.db, 'categories');
    return addDoc(categoryRef, category);
  }
}
