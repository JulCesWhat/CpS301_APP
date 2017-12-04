import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageCreateResolverService } from './../page-create/page-create-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PageCreateResolverService
  ]
})
export class CoreModule { }
