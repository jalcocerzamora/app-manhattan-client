import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { environment } from 'projects/environments/environment';

import { ICategory, IProduct, ISubproduct, Subproduct } from 'projects/core/models/db';

@Component({
  selector: 'app-menu-category-item',
  // templateUrl: './menu-category-item.component.html',
  template: `
    <div class="flex flex-col">

      <div class="flex flex-row">
        <h3 class="scroll-start w-full text-sm lg:text-xl font-bold uppercase mt-8 mb-2" [innerText]="Category.title"></h3>
      </div>

      <div class="cat_item_row flex space-x-5">

        <div class="flex flex-col divide-y divide-gray-300 w-1/2">
          <ng-container *ngIf="Products">
            <ng-container *ngFor="let Product of getHalft('Left'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
              <app-product-item [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product"
              [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="right" ></app-product-item>
            </ng-container>
          </ng-container>
        </div>

        <div class="flex flex-col divide-y divide-gray-300 w-1/2">
          <ng-container *ngIf="Products">
            <ng-container *ngFor="let Product of getHalft('Right'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
              <app-product-item [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product"
              [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="left" ></app-product-item>
            </ng-container>
          </ng-container>
        </div>

      </div>

    </div>
    <ng-content></ng-content>
  `,
  styleUrls: ['./menu-category-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryItemComponent implements OnInit {
  // overlay_inner

  @Input() Overlay: ElementRef;
  @Input() ParentContainer: ElementRef;

  @Input() Category: ICategory;
  @Input() Products: Array<Subproduct>;

  constructor() {
    // console.log('MenuCategoryItemComponent.constructor', this.Overlay);
  }

  // generateURL(image: string) {
  //   const imageName = (image === null || image === undefined ? '' : image.trim());
  //   return (imageName ? environment.PATH_ASSETS_IMAGES_MENU.concat(imageName) : environment.PATH_ASSETS_IMAGES_MENU_LOGO);
  // }

  ngOnInit(): void {
    // console.log('MenuCategoryItemComponent.ngOnInit', this.Overlay);
  }

  getHalft(side: 'Left' | 'Right'): Array<ISubproduct> {
    const Length = this.Products.length;
    const Halft = Math.round(Length / 2);

    const Left = this.Products.slice(0, Halft);
    const Right = this.Products.slice(Halft);

    return (side === 'Left' ? Left : Right);
  }

  getClass(fisrt: boolean, last: boolean) {
    return ( fisrt ? 'border-t border-gray-300' : (last ? 'border-b border-gray-300' : '') );
  }

  trackByMethod(index: number, el: ISubproduct): number {
    return el.id;
  }

}
