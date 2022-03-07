import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CurrentUserService } from '../services/currentUser.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public isLoggedIn: boolean = false;
  count: number;
  categories: Category[] = [];
  categoriesProtected: Category[] = [];

  constructor(private categoryService: CategoryService,
    private currentUserService: CurrentUserService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private logger: NGXLogger) {
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
      this.categoriesProtected = res;
      this.count = this.categories.length;
    })
  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.currentUserService.isLoggedIn();
  }

  edit(category: Category){
    this.logger.info('edit clicked' + category.name);
    this.router.navigate(['/category/'+category.id+'/edit']);
  }

  async delete(category: Category){
    this.logger.info('delete clicked');
    if(confirm("Möchtest du die Kategori " + category.id + " wirklich löschen?")) {
      this.logger.info('confirmed deletion of ' + category.id );
      this.SpinnerService.show();
      await this.categoryService.deleteCategory(category.id);
      this.SpinnerService.hide(); 
      this.router.navigate(['/home']);
    } 
  }

  search(searchEvent: any){
    if(searchEvent.target.value){
      const query = searchEvent.target.value.toLowerCase().trim();
      this.categories = this.categoriesProtected.filter( item => item.name.toLowerCase().includes(query.toLowerCase()) );
      
      this.count = this.categories.length;
      this.logger.info("search() found " + this.categories.length + " matching recipes");
    }else{
      this.categories = this.categoriesProtected;
    }

  }
  filter(val: any): void {
    if(val == "asc"){
      this.categories.sort((a,b) => a.name.localeCompare(b.name));

    }else if(val == "desc"){
      this.categories.sort((a,b) => b.name.localeCompare(a.name));

    }else if(val == "date-asc"){
      this.categories.sort((a,b) => a.id > b.id ? 1 : -1);
    }
    else if(val == "date-desc"){
      this.categories.sort((a,b) => b.id - a.id ? 1 : -1);
    }
  }

}