import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

import { MenuCategoryItemComponent } from '../index';
import { ISubproductsWithCategory } from 'projects/core/models/db';

@Component({
  selector: 'app-menu-category',
  // templateUrl: './menu-category.component.html',
  template: `
    <ng-container *ngFor="let Menu of Menus">
      <app-menu-category-item [Category]="Menu.Category" [Products]="Menu.Products" [Overlay]="Overlay" [ParentContainer]="ParentContainer"></app-menu-category-item>
    </ng-container>
    <ng-content></ng-content>
  `,
  styleUrls: ['./menu-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryComponent implements OnInit {

  menus: MenuCategoryItemComponent[] = [];

  @Input() Overlay: ElementRef;
  @Input() ParentContainer: ElementRef;

  @Input() Menus: Array<ISubproductsWithCategory> = [];

  constructor(

  ) {
    // console.log('MenuCategoryComponent.constructor', this.Overlay);
  }

  ngOnInit(): void {
    // console.log('MenuCategoryComponent.ngOnInit', this.Overlay);
  }

}
