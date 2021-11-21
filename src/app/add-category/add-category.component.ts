import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { CategoriesComponent } from '../categories/categories.component';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryFormGroup = new FormGroup({ name: new FormControl('', Validators.required) }); 

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private logger: NGXLogger) {}

  ngOnInit(): void {}

  async addCategory(): Promise<void>{
    const newCategory = new Category(this.categoryFormGroup.value);
    const success = this.categoryService.addCategory(newCategory)
    .then(function(docRef) {
      return true;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return false;
    });
    
    if(await success){
      this.logger.info('New category: ' + newCategory.name + " successfully added");
      this.router.navigate(['/categories']);
    }
    
  }
}
  