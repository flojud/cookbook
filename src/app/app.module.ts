import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

//custom
import { NavbarComponent } from './navbar/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

//https://mdbootstrap.com
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';

//spinner
import { NgxSpinnerModule } from "ngx-spinner";

//ng-bootstrap.github.io
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesComponent,
    AddRecipeComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideAuth(() => getAuth()),
    //provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    //provideRemoteConfig(() => getRemoteConfig())
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
