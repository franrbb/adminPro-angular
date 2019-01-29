import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NotpagefoundComponent
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NotpagefoundComponent
  ],
  providers: []
})
export class SharedModule { }
