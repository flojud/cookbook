import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { CategoriesComponent } from './categories/categories.component'
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: RecipesComponent },
  { path: "add", component: AddRecipeComponent },
  { path: "recipe/:id", component: DetailComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "category/add", component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
