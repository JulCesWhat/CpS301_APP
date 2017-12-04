import { Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PageCreateComponent } from './page-create/page-create.component';
import { Page404Component } from './page-404/page-404.component';


export const appRoutes: Routes =  [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: 'home', component: PageHomeComponent, pathMatch: 'full'
    },
    {
        path: 'create', component: PageCreateComponent, pathMatch: 'full'
    },
    {
        path: '404', component: Page404Component, pathMatch: 'full'
    },
    { 
        path: 'view', redirectTo: '/404', pathMatch: 'full'
    },
    { 
        path: 'view/:serviceID', component: PageViewComponent
    },
    { 
        path: '**', redirectTo: '/404', pathMatch: 'full'
    }
  ]
  