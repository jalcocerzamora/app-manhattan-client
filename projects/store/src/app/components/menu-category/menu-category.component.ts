import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

import { MenuCategoryItemComponent } from '../index';
import { ISubproductsWithCategory } from 'projects/core/models/db';

@Component({
  selector: 'app-menu-category',
  // templateUrl: './menu-category.component.html',
  template: `
    <ng-container *ngIf="Template; else elseTemplate">
      <ng-container *ngFor="let Menu of Menus">
        <app-menu-category-item [Template]="Template" [Category]="Menu.Category" [Products]="Menu.Products"></app-menu-category-item>
      </ng-container>
    </ng-container>
    <ng-template #elseTemplate>
      <ng-container *ngFor="let Menu of Menus">
        <app-menu-category-item  [Category]="Menu.Category" [Products]="Menu.Products" [Overlay]="Overlay" [ParentContainer]="ParentContainer"></app-menu-category-item>
      </ng-container>
    </ng-template>
    <ng-content></ng-content>
  `,
  styleUrls: ['./menu-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryComponent implements OnInit {

  menus: MenuCategoryItemComponent[] = [];

  @Input() Template: boolean = false;

  @Input() Overlay: ElementRef | null = null;
  @Input() ParentContainer: ElementRef | null = null;

  @Input() Menus: Array<ISubproductsWithCategory> = [];

  constructor(

  ) {
    // console.log('MenuCategoryComponent.constructor', this.Overlay);
  }

  ngOnInit(): void {
    // console.log('MenuCategoryComponent.ngOnInit', this.Overlay);
  }

}
