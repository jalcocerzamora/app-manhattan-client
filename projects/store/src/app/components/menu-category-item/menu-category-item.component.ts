import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { ICategory, IProduct, ISubproduct, Subproduct } from '../../core/models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-menu-category-item',
  // templateUrl: './menu-category-item.component.html',
  template: `
    <div class="flex flex-col">

      <div class="flex flex-row">
        <h3 class="w-full text-sm lg:text-xl font-bold uppercase pt-5 pb-2" [innerText]="Category.title"></h3>
      </div>

      <div class="cat_item_row scroll-start flex space-x-2 lg:space-x-5">

        <div class="flex flex-col divide-y divide-gray-300 w-1/2">
          <ng-container *ngIf="Products">
            <ng-container *ngFor="let Product of getHalft('Left'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
              <ng-container *ngTemplateOutlet="MenuItemTemplate;context:{ First: isFirst, Last: isLast, Data: Product }"></ng-container>
              <!-- <app-product-item [addClass]="{ 'border-t-1 border-gray-300': isFirst, 'border-b-1 border-gray-300': isLast }" [Category]="Category" [Product]="Product"
              [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="right" ></app-product-item> -->
            </ng-container>
          </ng-container>
        </div>

        <div class="flex flex-col divide-y divide-gray-300 w-1/2">
          <ng-container *ngIf="Products">
            <ng-container *ngFor="let Product of getHalft('Right'); index as Index; first as isFirst; last as isLast; trackBy: trackByMethod;">
              <ng-container *ngTemplateOutlet="MenuItemTemplate;context:{ First: isFirst, Last: isLast, Data: Product }"></ng-container>
              <!-- <app-product-item [addClass]="i" [Category]="Category" [Product]="Product"
              [Overlay]="Overlay" [ParentContainer]="ParentContainer" PopperPlacement="left" ></app-product-item> -->
            </ng-container>
          </ng-container>
        </div>

      </div>

    </div>

    <ng-template #MenuItemTemplate let-ISFIRST="First" let-ISLAST="Last" let-IMAGE="Data.image" let-NAME="Data.name" let-DESCRIPTION="Data.description" let-PRICE="Data.price">
      <!-- [ngClass]="{ 'border-t-1 border-gray-300': ISFIRST, 'border-b-1 border-gray-300': ISLAST }" -->
      <div class="menu-category-product w-full h-12 lg:h-20 flex cursor-pointer z-20 hover:bg-gray-200">
        <div class="pointer-events-none flex flex-row justify-center content-center items-center space-x-1 py-1">
          <div class="product-image w-1/6 self-center">
            <img [src]="generateURL(IMAGE)" alt="productAlt" srcset="" class="w-full h-10 lg:h-16 object-cover object-center">
          </div>
          <div class="product-content w-5/6 h-full self-center">
            <div class="h-full flex flex-row text-xs lg:text-base">
              <div class="product-detail w-5/6">
                <p [innerText]="NAME" class="font-bold"></p>
                <p [innerText]="DESCRIPTION" class="relative h-6 lg:h-10 truncate-2-lines lg:truncate-3-lines text-2xs lg:text-sm font-thin lg:text-normal capitalize leading-3 hyphens-normal">
              </div>
              <div class="product-price w-1/6 h-full self-start text-xs text-right">
                <p [innerText]="PRICE | currency" class="lg:text-base font-bold"></p>
              </div>
            </div>
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

  @Input() Overlay: ElementRef;
  @Input() ParentContainer: ElementRef;

  @Input() Category: ICategory;
  @Input() Products: Array<Subproduct>;

  ctx = {product: this.Products};

  constructor() {
    // console.log('MenuCategoryItemComponent.constructor', this.Overlay);
  }

  generateURL(image: string) {
    // tslint:disable-next-line: deprecation
    const img = (isNullOrUndefined(image) ? '' : image.trim());
    return (img ? `/assets/images/menu/${img}` : '/assets/images/logo.png');
  }

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

  trackByMethod(index: number, el: ISubproduct): number {
    return el.id;
  }

}
