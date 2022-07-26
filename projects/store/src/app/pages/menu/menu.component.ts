import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { ISubproductsWithCategory, Subproduct } from 'projects/core/models/db';
import { Observable } from 'rxjs';
import { ShopCartService } from '@core/services/shopcart/shop-cart.service';
import { SubproductService } from '@core/services/db/subproduct/subproduct.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('overlay_inner') overlayInner: ElementRef<HTMLDivElement> | null = null;
  @ViewChild('modal_body') modalBody: ElementRef<HTMLDivElement> | null = null;

  @ViewChild('modal_header') modalHeader: ElementRef<HTMLDivElement> | null = null;
  @ViewChild('menu_banner') menuBanner: ElementRef<HTMLDivElement> | null = null;

  public CategoryWithProducts: Observable<Array<ISubproductsWithCategory>> = this.getProducts();

  constructor(
    private el: ElementRef,
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
          this.modalHeader?.nativeElement.classList.add('modal-header-transparent');
      } else {
        this.modalHeader?.nativeElement.classList.remove('modal-header-transparent');
      }
    }, { threshold: [0] });

    let banner = this.menuBanner?.nativeElement;
    if(banner){
      observer.observe(banner);
    }
  }

  loadComponent() {
    this.el.nativeElement.closest('body').classList.add('overflow-hidden');
    // this.getProducts();
  }

  getProducts(): Observable<Array<ISubproductsWithCategory>> {
    return this.serviceSubproducts.All();
  }

}
