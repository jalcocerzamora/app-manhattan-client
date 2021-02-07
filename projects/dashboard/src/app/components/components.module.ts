import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'projects/dashboard/src/app/app-routing.module';

// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { NavbarComponent } from 'projects/dashboard/src/app/components/navbar/navbar.component';
import { HeaderComponent } from 'projects/dashboard/src/app/components/header/header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    HeaderComponent
  ]
})
export class ComponentsModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(faBars);
  }
}
