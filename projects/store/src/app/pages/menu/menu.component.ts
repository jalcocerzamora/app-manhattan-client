import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

import {
  Category, Product, Subproduct,
  ICategory, IProduct, ISubproduct, ISubproductsWithCategory
} from './../../core/models/index';

import { ScriptService } from '../../core/services/script.service';
import { SubproductService } from './../../core/services/db/subproduct.service';
import { Observable } from 'rxjs';
import { ShopCartService } from '../../core/services/shopcart/shop-cart.service';
import { IShopCartItem } from '../../core/models/shop-cart-item';

declare let fontAwesome: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('overlay_inner') overlayInner: ElementRef<HTMLDivElement>;
  @ViewChild('modal_body') modalBody: ElementRef<HTMLDivElement>;

  @ViewChild('modal_header') modalHeader: ElementRef<HTMLDivElement>;
  @ViewChild('menu_banner') menuBanner: ElementRef<HTMLDivElement>;

  public CategoryWithProducts: Observable<Array<ISubproductsWithCategory>> = this.getProducts();

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private scriptService: ScriptService,
    private serviceSubproducts: SubproductService,
    public serviceShopCart: ShopCartService<Subproduct>
  ) {
    // console.log('Loading External Scripts');
    // this.scriptService.load('fontAwesome', 'fontAwesome');
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true) {
          this.modalHeader.nativeElement.classList.add('modal-header-transparent');
      } else {
        this.modalHeader.nativeElement.classList.remove('modal-header-transparent');
      }
    }, { threshold: [0] });
    observer.observe(this.menuBanner.nativeElement);
  }

  loadComponent() {
    this.el.nativeElement.closest('body').classList.add('overflow-hidden');
    this.getProducts();
  }

  getProducts(): Observable<Array<ISubproductsWithCategory>> {
    return this.serviceSubproducts.All();
  }

}
