// tslint:disable-next-line: max-line-length
import { Component, OnInit, AfterViewInit, Input, ViewChild, HostListener, ChangeDetectionStrategy, ElementRef, TemplateRef, ViewContainerRef, Renderer2, Optional, ComponentRef } from '@angular/core';
import { environment } from 'projects/environments/environment';

import { Product, Subproduct, Category, ISubproduct, ICategory } from '../../core/models';

// import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import { createPopper, Placement } from '@popperjs/core';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-item',
  // templateUrl: './product-item.component.html',
  template: `
    <div addClass class="menu-category-product w-full h-12 lg:h-20 flex cursor-pointer z-20 hover:bg-gray-200">
      <div class="pointer-events-none flex flex-row justify-center content-center items-center space-x-1 py-1">
        <div class="product-image w-1/6 self-center">
          <img class="w-full h-10 lg:h-16 object-cover object-center" [src]="productImage" [alt]="productAlt" srcset="">
        </div>
        <div class="product-content w-5/6 h-full self-center">
          <div class="h-full flex flex-row text-xs lg:text-base">
            <div class="product-detail w-5/6">
              <p class="font-bold" [innerText]="Product.name"></p>
              <p class="relative h-6 lg:h-10 truncate-2-lines lg:truncate-3-lines text-2xs lg:text-sm font-normal capitalize leading-3 hyphens-normal" [innerText]="Product.description">
            </div>
            <div class="product-price w-1/6 h-full self-start text-xs text-right">
              <p class="lg:text-base font-bold" [innerText]="Product.price | currency"></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <ng-container #viewContainerPopper></ng-container>
    <ng-template #viewTemplatePopper></ng-template>
    <ng-template #popper><div>TEMPLATE</div></ng-template>

    <div #popperDiv id="tooltip" role="tooltip" class="bg-white border rounded-lg z-20">
      <div class="bg-white block font-normal leading-normal text-sm max-w-xs text-left no-underline break-words z-30">
        <button class="popper_close bg-white text-gray-400 absolute top-0 right-0 w-4 h-4 border rounded-full text-xs flex justify-center -mr-1"><i class="fas fa-times pointer-events-none" aria-hidden="true"></i></button>
        <div class="text-gray-500 overflow-x-hidden overflow-y-auto overscroll-contain m-3 mb-1">

          <div class="w-full mb-3">
            <img class="w-full h-24 lg:h-32 object-cover object-center mb-3"  [src]="productImage" [alt]="productAlt" srcset="">
            <small class="w-full text-2xs capitalize text-gray-600 h-5">{{ Product.description }}</small>
          </div>

          <div class="w-full h-56">
            <form class="w-full max-w-lg">
              <div class="flex -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Piezas <span class="text-gray-500 font-mono">(requerid)</span>
                  </label>
                  <div class="bg-white divide-y border rounded-md">
                    <div class="w-full flex flex-row justify-start content-center items-center p-1 lg:p-2">
                      <input type="radio" class="form-radio m-1" name="size" value="1" checked>
                      <label class="flex-auto m-1" for="size">10 pz</label>
                      <span class="flex-initial text-xs text-gray-500 m-1">+2.00</span>
                    </div>
                    <div class="flex flex-row justify-start content-center items-center p-1 lg:p-2">
                      <input type="radio" class="form-radio m-1" name="size" value="2" checked>
                      <label class="flex-auto m-1" for="size">20 pz</label>
                      <span class="flex-initial text-xs text-gray-500 m-1">+2.00</span>
                    </div>
                    <div class="flex flex-row justify-start content-center items-center p-1 lg:p-2">
                      <input type="radio" class="form-radio m-1" name="size" value="3" checked>
                      <label class="flex-auto m-1" for="size">30 pz</label>
                      <span class="flex-initial text-xs text-gray-500 m-1">+2.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                  <label for="instrutions" class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Piezas <span class="text-gray-500 font-mono">(requerid)</span>
                  </label>
                  <textarea id="instrutions" placeholder="Ejemplo: Sin pimienta / azucar / sal por favor." row="3" cols="100"></textarea>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    State
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>New Mexico</option>
                      <option>Missouri</option>
                      <option>Texas</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="bg-white text-white block shadow-t-md p-4">
          <button class="focus:outline-none focus:shadow-none bg-orange-500 w-full flex flex-row justify-center items-center divide-x divide-gray-400 rounded-md font-bold p-2 pulse">
            <div class="w-2/5 flex flex-col justify-start items-start content-start text-left px-5">
              <p class="text-xs lg:text-sm">$124.95 MXN</p>
            </div>
            <div class="w-3/5">
              <p class="text-xs lg:text-sm">Add to Cart</p>
            </div>
          </button>
        </div>
      </div>
      <div id="arrow" data-popper-arrow></div>
    </div> -->
  `,
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  private popperInstance = null;
  private popoverShow = false;
  private productCurrent = null;
  // Optional hint target if you desire using other element than specified one
  // @Input() this?: HTMLElement;

  @Input() ParentContainer: ElementRef;
  @Input() PopperPlacement: string;
  @Input() Overlay: ElementRef;


  @Input() addClass: string = null;
  @Input() Category: ICategory = null;
  @Input() Product: ISubproduct = null;

  @ViewChild('viewContainerPopper', { read: ViewContainerRef }) viewContainerPopper: ViewContainerRef;

  @ViewChild('viewTemplatePopper') viewTemplatePopper: TemplateRef<any>;

  @ViewChild('popper', { read: ElementRef }) Popper: ElementRef;

  @ViewChild('popperDiv', { read: ElementRef }) PopperDiv: ElementRef;

  // @ViewChild('popper', { read: ViewContainerRef }) tplVcRef: ViewContainerRef;

  @HostListener('click', ['$event.target']) onClick(target: Element) {
    console.log('User Click', target, );

    if (target.classList.contains('menu-category-product') || target.classList.contains('popper_close')) {
      if (this.popoverShow) {
        this.productCurrent.classList.toggle('relative');
        this.hidePoppper();
        this.popoverShow = false;
        this.productCurrent = null;
      } else {
        target.classList.toggle('relative');
        this.showPoppper();
        this.productCurrent = target;
        this.popoverShow = true;
      }
    }
  }

  get productImage(): string {
    // tslint:disable-next-line: deprecation
    const product = (isNullOrUndefined(this.Product.image) ? '' : this.Product.image.trim());
    return (product ? environment.PATH_ASSETS_IMAGES_MENU.concat(product) : environment.PATH_ASSETS_IMAGES_MENU_LOGO);
  }

  get productAlt(): string {
    return `${this.Category.title.trim()}-${this.Product.name.trim()}`;
  }

  constructor(
    // @Optional() parent: MenuCategoryItemComponent,
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {
    // console.log('ProductItemComponent.constructor', this.Overlay);
  }

  ngOnInit(): void {
    // console.log('ProductItemComponent.ngOnInit', this.Overlay);
    // An element to position the hint relative to
    // const reference = this.appPopper ? this.appPopper : this.el.nativeElement;

    // console.log('ngOnInit');

    // this.renderer.setStyle(this.PopperDiv.nativeElement, 'display', 'none');
  }

  ngAfterViewInit(): void {
    // console.log('ProductItemComponent.ngAfterViewInit', this.Overlay);
    // this.renderer.setStyle(this.PopperDiv.nativeElement, 'display', 'none');
    // const view = this.viewTemplatePopper.createEmbeddedView(null);
    // this.viewContainerPopper.insert(view);
    // this.tplVcRef.createEmbeddedView(this.tplRef);
    // The <! -- template bindings = {} -- > element in the page
    // let commentElement = this.tpl.elementRef.nativeElement;
    // Create an embedded view
    // let embeddedView = this.tpl.createEmbeddedView(null);
    // Add child nodes dynamically
    // embeddedView.rootNodes.forEach((node) => { commentElement.parentNode.insertBefore(node, commentElement.nextSibling); });
  }

  destroyPopper() {
    // this.popper.parentNode.removeChild(this.popper);
    this.renderer.setStyle(this.PopperDiv.nativeElement, 'display', 'none');
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  createPoppper() {
    // this.renderer.createComment(this.viewTemplatePopper.elementRef.nativeElement);
    this.renderer.removeStyle(this.PopperDiv.nativeElement, 'display');
    this.popperInstance = createPopper(this.el.nativeElement, this.PopperDiv.nativeElement, {
      placement: this.PopperPlacement as Placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [10, 20],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            // mainAxis: true, // true by default
            padding: { top: 35, bottom: 10 },
            boundary: document.querySelector('._md_body_inner'),
            // altBoundary: true,
          },
        },
      ],
    });
    // this.renderer.removeStyle(this.PopperDiv.nativeElement, 'display');
  }

  hidePoppper() {
    this.Overlay.nativeElement.classList.toggle('hidden');
    this.PopperDiv.nativeElement.removeAttribute('data-show');
    this.destroyPopper();
  }

  showPoppper() {
    this.Overlay.nativeElement.classList.toggle('hidden');
    this.PopperDiv.nativeElement.setAttribute('data-show', '');
    this.createPoppper();
  }



  // var div = document.getElementById('div');
  // var hs = div.scrollWidth > div.clientWidth;
  // var vs = div.scrollHeight > div.clientHeight;

  // document.getElementById('GFG').innerHTML
  //         = "Horizontal Scrollbar - " + hs
  //         +"<br>Vertical Scrollbar - " + vs;

  //   <div class="dt-row" *ngFor="let key of keys; let i = index;">
  //             <popover-content #i
  //                              title="Actions"
  //                              placement="bottom"
  //                              [animation]="false"
  //                              [closeOnClickOutside]="true"
  //                              [closeOnMouseOutside]="false" >
  //               {{key.interestingInfo}}
  //                 <a>Edit - {{key.name}}</a>
  //                 <a>Delete - {{key.name}}</a>
  //             </popover-content>

  //             <div [popover]="i">
  //                 {{key.clickText + key.name}}
  //             </div>
  //     </div>
  // </div>









  // // The hint to display
  // @Input() target: HTMLElement;
  // // Its positioning (check docs for available options)
  // @Input() placement?: Placement;
  // // Optional hint target if you desire using other element than specified one
  // @Input() appPopper?: HTMLElement;
  // // The popper instance
  // private popper: Popper;
  // private readonly defaultConfig: PopperOptions = {
  //   placement: "top",
  //   removeOnDestroy: true,
  //   modifiers: {
  //     arrow: {
  //       element: ".popper__arrow"
  //     }
  //   },
  //   eventsEnabled: false
  // };
  // private readonly destroy$ = new Subject<void>();

  // constructor(
  //   private readonly el: ElementRef,
  //   private readonly renderer: Renderer2
  // ) {}

  // ngOnInit(): void {
  //   // An element to position the hint relative to
  //   const reference = this.appPopper ? this.appPopper : this.el.nativeElement;

  //   this.popper = new Popper(reference, this.target, {
  //     ...this.defaultConfig,
  //     placement: this.placement || this.defaultConfig.placement
  //   });

  //   this.renderer.setStyle(this.target, "display", "none");

  //   merge(
  //     fromEvent(reference, "mouseenter"),
  //     fromEvent(reference, "mouseleave")
  //   )
  //     .pipe(
  //       filter(() => this.popper != null),
  //       pluck("type"),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe((e: any) => this.mouseHoverHandler(e));
  // }

  // ngOnDestroy(): void {
  //   if (!this.popper) {
  //     return;
  //   }

  //   this.popper.destroy();

  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  // private mouseHoverHandler(e: string): void {
  //   if (e === "mouseenter") {
  //     this.renderer.removeStyle(this.target, "display");
  //     this.popper.enableEventListeners();
  //     this.popper.scheduleUpdate();
  //   } else {
  //     this.renderer.setStyle(this.target, "display", "none");
  //     this.popper.disableEventListeners();
  //   }
  // }

}
