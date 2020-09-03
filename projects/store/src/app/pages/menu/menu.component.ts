import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

import {
  Category, Product, Subproduct,
  ICategory, IProduct, ISubproduct, ISubproductsWithCategory
} from './../../core/models/index';

import { ScriptService } from '../../core/services/script.service';
import { SubproductService } from './../../core/services/db/subproduct.service';
import { isArray } from 'util';
import { Observable } from 'rxjs';

declare let fontAwesome: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('overlay_inner') overlayInner: ElementRef;
  @ViewChild('modal_body') modalBody: ElementRef;

  @ViewChild('modal_header') modalHeader: ElementRef;
  @ViewChild('menu_banner') menuBanner: ElementRef;

  public CategoryWithProducts: Observable<Array<ISubproductsWithCategory>> = this.getProducts();

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private scriptService: ScriptService,
    private serviceSubproducts: SubproductService
  ) {
    console.log('Loading External Scripts');
    this.scriptService.load('fontAwesome', 'fontAwesome');
  }

  ngOnInit(): void {
    // this.loadComponent();
    this.el.nativeElement.closest('body').classList.add('overflow-hidden');
    this.getProducts();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true) {
          this.modalHeader.nativeElement.classList.add('bg-opacity-80');
      } else {
        this.modalHeader.nativeElement.classList.remove('bg-opacity-80');
      }
    }, { threshold: [0] });
    observer.observe(this.menuBanner.nativeElement);
  }

  getProducts(): Observable<Array<ISubproductsWithCategory>> {
    return this.serviceSubproducts.All();
  }
}
