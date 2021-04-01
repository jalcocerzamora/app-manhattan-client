import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

import { ICategory, ISubproduct } from 'projects/core/models/db';

@Component({
  selector: 'app-menu-category-item',
  // templateUrl: './menu-category-item.component.html',
  template: `
    <ng-container *ngIf="Template; else elseTemplate">
      <div class="flex flex-col">
        <div class="flex flex-row">
          <div class="scroll-start w-full h-5 text-sm md:text-xl font-bold uppercase mt-8 mb-2">
            <div class="w-1/5 charge-data"></div>
          </div>
        </div>
        <div class="cat_item_row flex flex-col md:flex-row md:space-x-5">
          <div class="w-full flex flex-col divide-y md:w-1/2">
            <ng-container *ngIf="Products">
              <ng-container *ngFor="let Product of getHalft('Left'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
                <app-product-item [Template]="Template" [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product" PopperPlacement="right" ></app-product-item>
              </ng-container>
            </ng-container>
          </div>

          <div class="w-full flex flex-col divide-y md:w-1/2">
            <ng-container *ngIf="Products">
              <ng-container *ngFor="let Product of getHalft('Right'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
                <app-product-item [Template]="Template" [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product" PopperPlacement="left" ></app-product-item>
              </ng-container>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-container>
    <ng-template #elseTemplate>
      <div class="flex flex-col">
        <div class="flex flex-row">
          <h3 class="scroll-start w-full text-sm md:text-xl font-bold uppercase mt-8 mb-2" [innerText]="Category?.title"></h3>
        </div>
        <div class="cat_item_row flex flex-col md:flex-row md:space-x-5">
          <div class="w-full flex flex-col divide-y divide-gray-300 md:w-1/2">
            <ng-container *ngIf="Products">
              <ng-container *ngFor="let Product of getHalft('Left'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
                <app-product-item [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product"
                [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="right" ></app-product-item>
              </ng-container>
            </ng-container>
          </div>

          <div class="w-full flex flex-col divide-y divide-gray-300 md:w-1/2">
            <ng-container *ngIf="Products">
              <ng-container *ngFor="let Product of getHalft('Right'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
                <app-product-item [addClass]="getClass(isFirst, isLast)" [Category]="Category" [Product]="Product"
                [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="left" ></app-product-item>
              </ng-container>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-content></ng-content>
  `,
  styleUrls: ['./menu-category-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryItemComponent implements OnInit {
  // overlay_inner
  @Input() Template: boolean = false;

  @Input() Overlay: ElementRef;
  @Input() ParentContainer: ElementRef;

  @Input() TemplateCategory: ICategory;
  @Input() Category: ICategory;
  @Input() TemplateProduct: Array<ISubproduct>;
  @Input() Products: Array<ISubproduct>;

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
