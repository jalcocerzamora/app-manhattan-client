import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'projects/dashboard/src/app/app-routing.module';

// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { NavbarComponent } from 'projects/dashboard/src/app/components/navbar/navbar.component';
import { HeaderComponent } from 'projects/dashboard/src/app/components/header/header.component';
import { MasterComponent } from 'projects/dashboard/src/app/components/master/master.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    MasterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    MasterComponent
  ]
})
export class ComponentsModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(faBars);
  }
}
