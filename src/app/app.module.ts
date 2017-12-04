import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';

import { appRoutes } from './routes';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HeaderComponent } from './nav/header/header.component';
import { SiderComponent } from './nav/sider/sider.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PageCreateComponent } from './page-create/page-create.component';
import { Page404Component } from './page-404/page-404.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { FormDirective } from './form.directive';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SiderComponent,
    PageHomeComponent,
    PageViewComponent,
    PageCreateComponent,
    Page404Component,
    DynamicComponent,
    FormDirective
  ],
  entryComponents: [DynamicComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
