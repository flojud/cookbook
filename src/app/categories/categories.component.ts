import { Component, OnInit } from '@angular/core';
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
  
  categories: Category[] = [];
  constructor(private categoryService: CategoryService,
    private currentUserService: CurrentUserService) {
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    })
  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.currentUserService.isLoggedIn();
  }

  edit(){}
  delete(){}

}