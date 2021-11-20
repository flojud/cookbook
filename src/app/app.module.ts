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
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';

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


//ng-bootstrap.github.io
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component'; 

//Flex grid Layout
import { FlexLayoutModule } from '@angular/flex-layout';

//Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ActionButtonComponent } from './action-button/action-button.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

// Speed Dial Floating Button
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial';
import { FooterComponent } from './footer/footer.component';

//Ngx
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxEditorModule } from 'ngx-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesComponent,
    AddRecipeComponent,
    DetailComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ActionButtonComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgxEditorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideAuth(() => getAuth()),
    //provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    //provideRemoteConfig(() => getRemoteConfig())
    NgxSpinnerModule,
    NgbModule, MatDialogModule,
    MatTabsModule, MatMenuModule, MatIconModule, MatListModule, MatButtonModule,MatCardModule,MatGridListModule,
    EcoFabSpeedDialModule,
    FlexLayoutModule,
    ImageCropperModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
