import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ISubproductsWithCategory } from '../../core/models';
import { Observable } from 'rxjs';
import { ScriptService } from '../../core/services/script.service';
import { SubproductService } from '../../core/services/db/subproduct.service';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopcartComponent implements OnInit, AfterViewInit {
  @ViewChild('container_menu_header') containerHeader: ElementRef;
  @ViewChild('container_menu_body_markup_banner') containerBanner: ElementRef;

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
    // this.getProducts();
  }

  ngAfterViewInit(): void {
    // const observer = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting === true) {
    //     if (entries[0].intersectionRatio === 1) {
    //       this.containerHeader.nativeElement.classList.add('bg-transparent-80');
    //       this.containerHeader.nativeElement.classList.remove('bg-white');
    //     }
    //   } else {
    //     this.containerHeader.nativeElement.classList.remove('bg-transparent-80');
    //     this.containerHeader.nativeElement.classList.add('bg-white');
    //   }
    // }, { threshold: [0, 0.5, 1] });
    // observer.observe(this.containerBanner.nativeElement);
  }

  getProducts(): Observable<Array<ISubproductsWithCategory>> {
    return this.serviceSubproducts.All();
  }

}
