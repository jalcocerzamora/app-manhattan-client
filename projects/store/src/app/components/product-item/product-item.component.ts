// tslint:disable-next-line: max-line-length
import { Component, OnInit, AfterViewInit, Input, ViewChild, HostListener, ChangeDetectionStrategy, ElementRef, TemplateRef, ViewContainerRef, Renderer2, Optional, ComponentRef, ComponentFactoryResolver, LOCALE_ID, Inject, DEFAULT_CURRENCY_CODE } from '@angular/core';
import '@angular/common/locales/fr-CA';

import { ISubproduct, ICategory } from 'projects/core/models/db';

import { createPopper, Placement } from '@popperjs/core';

import { ProductPopperComponent } from 'projects/store/src/app/components/product-popper/product-popper.component';
import { Router } from '@angular/router';
import { GET_URL_ASSETS } from 'projects/core/helpers/functions';

@Component({
  selector: 'app-product-item',
  // templateUrl: './product-item.component.html',
  template: `
  <div [ngClass]="addClass" class="menu-category-product w-full h-12 lg:h-20 flex cursor-pointer hover:bg-gray-200">
      <div class="pointer-events-none flex flex-row justify-center content-center items-center space-x-1 py-1">
        <div class="product-image w-1/6 self-center">
          <img [src]="productImage" alt="productAlt" class="w-full h-10 lg:h-16 object-cover object-center">
        </div>
        <div class="product-content w-5/6 h-full self-center">
					<div class="h-full flex flex-row flex-wrap text-xs lg:text-base">
						<div class="product-header w-full flex flex-row justify-between">
								<span [innerText]="Product.name" class="float-left font-bold"></span>
								<span [innerText]="Product.price | currency" class="float-right lg:text-base font-bold"></span>
						</div>
						<div class="product-description w-full">
						  <p [innerText]="Product.description | firstcase" class="relative h-6 lg:h-10 truncate-lines-2 lg:truncate-lines-3 text-2xs lg:text-sm font-thin lg:text-normal text-justify leading-3 hyphens-normal">
					  </div>
          </div>
        </div>
      </div>
    </div>

    <ng-template #viewTemplatePopper></ng-template>
  `,
  styleUrls: ['./product-item.component.scss'],
  // providers: [ ProductPopperComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  private popperInstance = null;
  private popoverShow = null;
  private productCurrent = null;

  @Input() ParentContainer: ElementRef;
  @Input() PopperPlacement: string;
  @Input() Overlay: ElementRef;

  @Input() addClass: string = null;
  @Input() Category: ICategory = null;
  @Input() Product: ISubproduct = null;

  @ViewChild('viewTemplatePopper', { read: ViewContainerRef }) viewTemplatePopper: ViewContainerRef;
  private componentRef: any;

  @HostListener('click', ['$event.target']) onClick(target: HTMLDivElement) {
    // console.log('User Click', target, );
    target.classList.toggle('z-20');
    if (target.classList.contains('menu-category-product')) {
      if (this.popoverShow) {
        this.destroyComponent();
      } else {
        this.createComponent(target);
      }
    }
  }

  get productImage(): string {
    const productImage = (this.Product.image === null || this.Product.image === undefined ? null : this.Product.image.trim());
    return GET_URL_ASSETS(productImage);
  }

  get productAlt(): string {
    return `${this.Category.title.trim()}-${this.Product.name.trim()}`;
  }

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(DEFAULT_CURRENCY_CODE) public currencyCode: string,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private readonly el: ElementRef<HTMLDivElement>,
    private readonly renderer: Renderer2
  ) {
    // console.log('ProductItemComponent.constructor', this.Overlay);
  }

  ngOnInit(): void {
    // console.log('ProductItemComponent.ngOnInit', this.Overlay);
  }

  ngAfterViewInit(): void {
    // console.log('ProductItemComponent.ngAfterViewInit', this.Overlay);
  }

  createComponent(target: Element ) {
    target.classList.toggle('relative');
    target.classList.toggle('bg-white');
    this.renderer.addClass(this.ParentContainer.nativeElement, 'overflow-hidden');

    this.productCurrent = target;
    this.popoverShow = true;

    this.viewTemplatePopper.clear();
    const componentFactory = this.resolver.resolveComponentFactory(ProductPopperComponent);
    this.componentRef = this.viewTemplatePopper.createComponent<ProductPopperComponent>(componentFactory);
    this.componentRef.instance.category = this.Category;
    this.componentRef.instance.subproduct = this.Product;
    this.componentRef.instance.destroyPopper.subscribe(i => this.destroyComponent());

    this.showPoppper();
  }

  showPoppper() {
    const $reference  = this.el.nativeElement;
    const $popper     = this.componentRef.location.nativeElement;
    this.renderer.setStyle($popper, 'display', 'none');
    this.createPoppper();
    setTimeout(async () => {
      const state = await this.popperInstance.update();
      // console.log(state);
    }, 50);
  }

  createPoppper() {
    const $reference  = this.el.nativeElement;
    const $popper     = this.componentRef.location.nativeElement;
    const $boundary: HTMLElement   = this.ParentContainer.nativeElement.querySelector('.modal-overlay');
    const arrow = document.querySelector('#arrow');

    this.renderer.removeClass($boundary, 'hidden');
    this.renderer.removeStyle($popper, 'display');
    this.renderer.addClass($popper, 'border');
    this.renderer.addClass($popper, 'border-gray-300');
    this.renderer.addClass($popper, 'rounded');
    this.renderer.addClass($popper, 'shadow');
    this.renderer.setStyle($popper, 'z-index', '9');

    this.popperInstance = createPopper($reference, $popper, {
      placement: this.PopperPlacement as Placement,
      // strategy: 'absolute', // fixed absolute
      onFirstUpdate: (data) => {
        // console.log(data);
      },
      modifiers: [
        { name: 'arrow', options: { element: arrow, padding: 15 }, },
        { name: 'offset', options: {
          offset: [ -5, 12 ] },
        },
        {
          name: 'preventOverflow', options: {
            padding: { top: 20, bottom: 20 },
            boundary: document.querySelector('.modal-overlay'), // 'clippingParents'
          },
        }
      ],
    });

    // console.log(/*$reference, $popper, $boundary,*/ this.popperInstance);

    const customBoundary = document.querySelector<HTMLDivElement>('.modal-body-inner');
    // detectOverflow(this.popperInstance.state, {
    //   // boundary: customBoundary, // 'clippingParents' by default
    //   // Different padding on certain sides – unspecified sides are 0
    //   padding: { top: 20, right: 5 },
    // });
  }

  destroyComponent() {
    // console.log('destroyComponent');
    this.renderer.removeClass(this.ParentContainer.nativeElement, 'overflow-hidden');
    this.productCurrent.classList.toggle('relative');
    this.productCurrent.classList.toggle('bg-white');
    this.componentRef.destroy();
    this.hidePoppper();
    this.productCurrent = null;
    this.popoverShow = false;
  }

  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  hidePoppper() {
    const $reference  = this.el.nativeElement;
    const $popper     = this.componentRef.location.nativeElement;
    const $boundary: HTMLElement   = this.ParentContainer.nativeElement.querySelector('.modal-overlay');

    // $popper.removeAttribute('data-show');
    // this.Overlay.nativeElement.classList.toggle('hidden');
    this.renderer.addClass($boundary, 'hidden');
    this.destroyPopper();
  }
}
