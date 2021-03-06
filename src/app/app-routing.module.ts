import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: RecipesComponent },
  { path: "recipe/add", component: AddRecipeComponent },
  { path: "category/add", component: AddCategoryComponent },
  { path: "category/:id/edit", component: AddCategoryComponent },
  { path: "recipe/:id", component: DetailComponent },
  { path: "recipe/:id/edit", component: AddRecipeComponent },
  { path: "categories", component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
